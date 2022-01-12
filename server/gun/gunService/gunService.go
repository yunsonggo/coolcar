package gunService

import (
	gunpb "2021/coolcar/server/gun/api/gen/v1"
	"2021/coolcar/server/gun/gunDao"
	"2021/coolcar/server/gun/mq"
	"2021/coolcar/server/shared/id"
	"context"
	"go.mongodb.org/mongo-driver/mongo"
	"go.uber.org/zap"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

type Service struct {
	Logger *zap.Logger
	Mongo *gunDao.Mongo
	Publisher mq.Publisher
}

func (s *Service) CreateGun(ctx context.Context,req *gunpb.CreateGunRequest) (*gunpb.GunEntity,error) {
	gr,err := s.Mongo.CreateGun(ctx,req)
	if err != nil {
		return nil,status.Error(codes.Internal,err.Error())
	}
	return &gunpb.GunEntity{
		Id:  gr.Id.Hex(),
		Gun: nil,
	},nil
}

func (s *Service) GetGun(ctx context.Context,req *gunpb.GetGunRequest) (*gunpb.Gun,error) {
	gr,err := s.Mongo.GetGun(ctx,id.GunId(req.Id))
	if err != nil {
		return nil,status.Error(codes.NotFound,"")
	}
	return gr.Gun,nil
}

func (s *Service) GetGunList(ctx context.Context,req *gunpb.GetGunListRequest) (*gunpb.GetGunListResponse,error) {
	guns,err := s.Mongo.GetGunList(ctx)
	if err != nil {
		s.Logger.Error("get gun list err",zap.Error(err))
		return nil,status.Error(codes.Internal,"")
	}
	res := &gunpb.GetGunListResponse{}
	for _,gr := range guns {
		res.GunList = append(res.GunList,&gunpb.GunEntity{
			Id:  gr.Id.Hex(),
			Gun: gr.Gun,
		})
	}
	return res,nil
}

func (s *Service) LockGun(ctx context.Context,req *gunpb.LockGunRequest) (*gunpb.LockGunResponse,error) {
	gun,err := s.Mongo.UpdateGun(ctx,id.GunId(req.Id),gunpb.GunStatus_UNLOCKED,&gunDao.GunUpdate{
		Status:gunpb.GunStatus_LOCKING,
	})
	if err != nil {
		code := codes.Internal
		if err == mongo.ErrNoDocuments {
			code = codes.NotFound
		}
		return nil,status.Errorf(code,"lock gun:%s err:%v\n",req.Id,err)
	}
	s.publish(ctx,gun)
	return &gunpb.LockGunResponse{},nil
}

func (s *Service) UnlockGun(ctx context.Context, req *gunpb.UnlockGunRequest) (*gunpb.UnlockGunResponse, error) {
	gun, err := s.Mongo.UpdateGun(ctx, id.GunId(req.Id), gunpb.GunStatus_LOCKED, &gunDao.GunUpdate{
		Status: gunpb.GunStatus_UNLOCKING,
		Driver: req.Driver,
		UpdateTripID: true,
		TripID: id.TripId(req.TripId),
	})
	if err != nil {
		code := codes.Internal
		if err == mongo.ErrNoDocuments {
			code = codes.NotFound
		}
		return nil, status.Errorf(code, "unlock gun: %v", err)
	}
	s.publish(ctx, gun)
	return &gunpb.UnlockGunResponse{}, nil
}

func (s *Service) UpdateGun(ctx context.Context, req *gunpb.UpdateGunRequest) (*gunpb.UpdateGunResponse, error) {
	update := &gunDao.GunUpdate{
		Status: req.Status,
		Position: req.Position,
	}
	if req.Status == gunpb.GunStatus_LOCKED {
		update.Driver = &gunpb.Driver{}
		update.UpdateTripID = true
		update.TripID = id.TripId("")
	}
	gun, err := s.Mongo.UpdateGun(ctx, id.GunId(req.Id), gunpb.GunStatus_GS_NO_SPECIFIED, update)
	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}
	s.publish(ctx, gun)
	return &gunpb.UpdateGunResponse{}, nil
}

func (s *Service) publish(ctx context.Context,gun *gunDao.GunRecord) {
	err := s.Publisher.Publish(ctx,&gunpb.GunEntity{
		Id:  gun.Id.Hex(),
		Gun: gun.Gun,
	})
	if err != nil {
		s.Logger.Warn("publish gun data err",zap.Error(err))
	}
}