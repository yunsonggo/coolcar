package rentalService

import (
	rentalpb "2021/coolcar/server/rental/api/gen/v1"
	"2021/coolcar/server/rental/rentalService/rentalDao"
	"2021/coolcar/server/shared/id"
	"2021/coolcar/server/shared/middleware"
	"2021/coolcar/server/shared/mongoShare/objid"
	"context"
	"go.uber.org/zap"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"time"
)

type Server struct {
	Logger *zap.Logger
	Mongo *rentalDao.Mongo
	ProfileManager ProfileManager
	GunManager GunManager
	POIManager POIManager
	DistanceCalc   DistanceCalc
}

type DistanceCalc interface {
	DistanceKm(context.Context, *rentalpb.Location, *rentalpb.Location) (float64, error)
}

// 验证身份接口
type ProfileManager interface {
	Verify(ctx context.Context,accountId id.AccountId) (id.IdentityId,error)
}

// 验证枪是否可用
type GunManager interface {
	Verify(ctx context.Context,gunId id.GunId,location *rentalpb.Location) error
	Unlock(ctx context.Context,gunId id.GunId,aid id.AccountId,tid id.TripId,avatarUrl string) error
	Lock(ctx context.Context,gunId id.GunId) error
}

// 查询地标
type POIManager interface {
	Resolve(ctx context.Context,location *rentalpb.Location) (string,error)
}

func (ts *Server) CreateTrip(ctx context.Context,req *rentalpb.CreateTripRequest) (res *rentalpb.TripEntity,err error) {
	aid,err := middleware.AccountIdFromContext(ctx)
	if err != nil {
		return nil,err
	}
	if req.GunId == "" || req.Start == nil {
		return nil,status.Error(codes.InvalidArgument,"")
	}
	// 验证身份 返回 验证身份的记录ID 类似 快照 防止重新验证 更换身份 或用于 追溯
	iId,err := ts.ProfileManager.Verify(ctx,id.AccountId(aid))
	if err != nil {
		return nil,status.Errorf(codes.FailedPrecondition,err.Error())
	}
	// 检查状态是否可用
	err = ts.GunManager.Verify(ctx,id.GunId(req.GunId),req.Start)
	if err != nil {
		return nil,status.Errorf(codes.FailedPrecondition,err.Error())
	}
	// 创建行程
	ls := ts.calcCurrentStatus(ctx,&rentalpb.LocationStatus{
		Location:     req.Start,
		TimestampSec: nowFunc(),
	})
	tr,err := ts.Mongo.CreateTrip(ctx,&rentalpb.Trip{
		AccountId:  aid,
		GunId:      req.GunId,
		Start:      ls,
		Current:    ls,
		End:        nil,
		Status:     rentalpb.TripStatus_IN_PROGRESS,
		IdentityId: iId.String(),
	})
	if err != nil {
		ts.Logger.Error("创建行程失败",zap.Error(err))
		return nil,status.Error(codes.AlreadyExists,"")
	}
	// 开锁 如果开锁成功而创建行程失败,后果很严重 因此要先创建行程
	go func() {
		err = ts.GunManager.Unlock(context.Background(),id.GunId(req.GunId),id.AccountId(aid),objid.ToTripId(tr.Id),req.AvatarUrl)
		if err != nil {
			ts.Logger.Error("开锁失败",zap.Error(err))
		}
	}()
	return &rentalpb.TripEntity{
		Id:  tr.Id.Hex(),
		Trip: tr.Trip,
	},nil
}

func (ts *Server) GetTrip(ctx context.Context, req *rentalpb.GetTripRequest) (res *rentalpb.Trip, err error) {
	aid,err := middleware.AccountIdFromContext(ctx)
	if err != nil {
		return nil,err
	}
	tr,err := ts.Mongo.GetTrip(ctx,id.TripId(req.Id),id.AccountId(aid))
	if err != nil {
		return nil,status.Error(codes.NotFound,"")
	}
	return tr.Trip,nil
}

func (ts *Server) GetTripList(ctx context.Context, req *rentalpb.GetTripListRequest) (res *rentalpb.GetTripListResponse, err error) {
	aid,err := middleware.AccountIdFromContext(ctx)
	if err != nil {
		return nil,err
	}
	trs,err := ts.Mongo.GetTripList(ctx,id.AccountId(aid),req.Status)
	if err != nil {
		ts.Logger.Error("get trip list err:",zap.Error(err))
		return nil,status.Error(codes.Unauthenticated,"")
	}
	res = &rentalpb.GetTripListResponse{}
	for _,tr := range trs {
		res.TripList = append(res.TripList,&rentalpb.TripEntity{
			Id:   tr.Id.Hex(),
			Trip: tr.Trip,
		})
	}
	return res,nil
}

func (ts *Server) UpdateTrip(ctx context.Context, req *rentalpb.UpdateTripRequest) (res *rentalpb.Trip,err error) {
	aid,err := middleware.AccountIdFromContext(ctx)
	if err != nil {
		return nil,status.Errorf(codes.Unauthenticated,"")
	}
	tid := id.TripId(req.Id)
	tr,err := ts.Mongo.GetTrip(ctx,tid,id.AccountId(aid))
	if err != nil {
		return nil,status.Errorf(codes.Unauthenticated,"查找要结束的行程失败")
	}
	// 行程中 更新行程中状态
	if tr.Trip.Status == rentalpb.TripStatus_FINISHED {
		return nil, status.Error(codes.FailedPrecondition, "行程已经结束")
	}
	if tr.Trip.Current == nil {
		ts.Logger.Error("trip current lost",zap.String("id",tr.Id.String()))
		return nil,status.Error(codes.Internal,"current is nil")
	}
	cur := tr.Trip.Current
	if req.Current != nil {
		cur = req.Current
	}
	tr.Trip.Current = ts.calcCurrentStatus(ctx,cur)

	// 已结束行程
	if req.EndTrip {
		tr.Trip.End = tr.Trip.Current
		tr.Trip.Status = rentalpb.TripStatus_FINISHED
		err = ts.GunManager.Lock(ctx,id.GunId(tr.Trip.GunId))
		if err != nil {
			ts.Logger.Error("锁枪失败",zap.Error(err))
			return nil,status.Errorf(codes.FailedPrecondition,"")
		}
	}
	err = ts.Mongo.UpdateTrip(ctx,tid,id.AccountId(aid),tr.UpdatedAt,tr.Trip)
	if err != nil {
		return nil,status.Error(codes.Unauthenticated,"")
	}
	return tr.Trip,nil
}

// 模拟计算费用系数
//var centsPerSec = 0.7
var nowFunc = func() int64 {
	return time.Now().Unix()
}
func (ts *Server) calcCurrentStatus(ctx context.Context,last *rentalpb.LocationStatus) *rentalpb.LocationStatus {
	// 当前状态距离上次状态的时间间隔
	nowTime := nowFunc()
	//elapsedSec := float64(nowTime - last.TimestampSec)
	//poi,err := ts.POIManager.Resolve(ctx,cur)
	//if err != nil {
	//	ts.Logger.Info("获取地标失败",zap.Error(err))
	//}
	return &rentalpb.LocationStatus{
		Location:     last.Location,
		LocationName: last.LocationName,
		KmDriven:     last.KmDriven,
		FeeCent:      last.FeeCent,
		TimestampSec: nowTime,
	}
}