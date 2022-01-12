package profileService

import (
	blobpb "2021/coolcar/server/blob/api/gen/v1"
	rentalpb "2021/coolcar/server/rental/api/gen/v1"
	"2021/coolcar/server/rental/profileService/profileDao"
	"2021/coolcar/server/shared/id"
	"2021/coolcar/server/shared/middleware"
	"context"
	"go.mongodb.org/mongo-driver/mongo"
	"go.uber.org/zap"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"time"
)

type Server struct {
	Logger *zap.Logger
	Mongo *profileDao.Mongo
	BlobClient blobpb.BlobServiceClient
	PhotoGetExpire time.Duration
	PhotoUploadExpire time.Duration
}

// 获取验证信息
func (s *Server) GetProfile(ctx context.Context, req *rentalpb.GetProfileRequest) (*rentalpb.Profile, error) {
	aid,err := middleware.AccountIdFromContext(ctx)
	if err != nil {
		return nil,err
	}
	pr,err := s.Mongo.GetProfile(ctx,id.AccountId(aid))
	if err != nil || pr.Profile == nil{
		if err == mongo.ErrNoDocuments {
			return &rentalpb.Profile{},nil
		}
		s.Logger.Error("查询profile失败",zap.Error(err))
		return nil,status.Error(codes.Internal,"")
	}
	return pr.Profile,nil
}
// 提交验证信息
func (s *Server) SubmitProfile(ctx context.Context, req *rentalpb.Identity) (*rentalpb.Profile, error) {
	aid,err := middleware.AccountIdFromContext(ctx)
	if err != nil {
		return nil,err
	}
	p := &rentalpb.Profile{
		Identity:       req,
		IdentityStatus: rentalpb.IdentityStatus_PENDING,
	}
	prevState := rentalpb.IdentityStatus_UN_SUBMITTED
	err = s.Mongo.UpdateProfile(ctx,id.AccountId(aid),prevState,p)
	if err != nil {
		s.Logger.Error("更新profile失败",zap.Error(err))
		return nil,status.Error(codes.Internal,"")
	}
	//TODO:: 模拟后台审核验证身份
	go func() {
		time.Sleep(3 * time.Second)
		stateErr := s.Mongo.UpdateProfile(context.Background(),id.AccountId(aid),rentalpb.IdentityStatus_PENDING,&rentalpb.Profile{
			Identity:       req,
			IdentityStatus: rentalpb.IdentityStatus_VERIFIED,
		})
		if stateErr != nil {
			s.Logger.Error("模拟更新审核通过状态失败",zap.Error(stateErr))
		}
	}()
	return p,nil
}
// 清除验证信息
func (s *Server) ClearProfile(ctx context.Context, req *rentalpb.ClearProfileRequest) (*rentalpb.Profile, error) {
	aid,err := middleware.AccountIdFromContext(ctx)
	if err != nil {
		return nil,err
	}
	p := &rentalpb.Profile{}
	prevState := rentalpb.IdentityStatus_VERIFIED
	err = s.Mongo.UpdateProfile(ctx,id.AccountId(aid),prevState,p)
	if err != nil {
		s.Logger.Error("清除profile失败",zap.Error(err))
		return nil,status.Error(codes.Internal,"")
	}
	return p,nil
}
// 获取验证图片
func (s *Server) GetProfilePhoto(ctx context.Context, req *rentalpb.GetProfilePhotoRequest) (*rentalpb.GetProfilePhotoResponse, error) {
	aid,err := middleware.AccountIdFromContext(ctx)
	if err != nil {
		return nil,err
	}
	pr,err := s.Mongo.GetProfile(ctx,id.AccountId(aid))
	if err != nil || pr.Profile == nil || pr.PhotoBlobId == ""{
		if err == mongo.ErrNoDocuments {
			return nil,status.Error(codes.NotFound,"")
		}
		s.Logger.Error("查询profile失败",zap.Error(err))
		return nil,status.Error(codes.Internal,"")
	}
	br,err := s.BlobClient.GetBlobURL(ctx,&blobpb.GetBlobURLRequest{
		Id:               pr.PhotoBlobId,
		UploadUrlTimeout: int32(s.PhotoGetExpire.Seconds()),
	})
	if err != nil {
		s.Logger.Error("获取blob失败",zap.Error(err))
		return nil,status.Error(codes.Internal,"")
	}
	return &rentalpb.GetProfilePhotoResponse{
		Url: br.Url,
	},nil
}
// 创建验证图片
func (s *Server) CreateProfilePhoto(ctx context.Context,req *rentalpb.CreateProfileRequest) (*rentalpb.CreateProfilePhotoResponse, error) {
	aid,err := middleware.AccountIdFromContext(ctx)
	if err != nil {
		return nil,err
	}
	br,err := s.BlobClient.CreateBlob(ctx,&blobpb.CreateBlobRequest{
		AccountId:        aid,
		UploadUrlTimeout: int32(s.PhotoUploadExpire.Seconds()),
	})
	if err != nil {
		s.Logger.Error("获取blob失败",zap.Error(err))
		return nil,status.Error(codes.Internal,"")
	}
	err = s.Mongo.UpdateProfilePhoto(ctx,id.AccountId(aid),id.BlobId(br.Id))
	if err != nil {
		s.Logger.Error("新建profile photo 失败",zap.Error(err))
		return nil,status.Error(codes.Aborted,"")
	}
	return &rentalpb.CreateProfilePhotoResponse{UploadUrl: br.UploadUrl},nil
}
// 获取图片内容 并校验
func (s *Server) CompleteProfilePhoto(ctx context.Context,req *rentalpb.CompleteProfileRequest) (*rentalpb.Identity, error) {
	aid,err := middleware.AccountIdFromContext(ctx)
	if err != nil {
		return nil,err
	}
	pr,err := s.Mongo.GetProfile(ctx,id.AccountId(aid))
	if err != nil || pr.Profile == nil || pr.PhotoBlobId == ""{
		if err == mongo.ErrNoDocuments {
			return nil,status.Error(codes.NotFound,"")
		}
		s.Logger.Error("查询profile失败",zap.Error(err))
		return nil,status.Error(codes.Internal,"")
	}
	br,err := s.BlobClient.GetBlob(ctx,&blobpb.GetBlobRequest{
		Id: pr.PhotoBlobId,
	})
	if err != nil {
		s.Logger.Error("获取blob失败",zap.Error(err))
		return nil,status.Error(codes.Aborted,"")
	}
	//TODO:: 图片识别API 此处是模拟数据 后期从数据库抓取数据用于校验
	s.Logger.Info("profile photo data:",zap.Int("size:",len(br.Data)))
	return &rentalpb.Identity{
		LicNumber:       "112233",
		Name:            "张三",
		Gender:          1,
		BirthDataMillis: 63046860000,
	},nil
}

func (s *Server) ClearProfilePhoto(ctx context.Context,req *rentalpb.ClearProfilePhotoRequest) (*rentalpb.ClearProfilePhotoResponse,error) {
	aid,err := middleware.AccountIdFromContext(ctx)
	if err != nil {
		return nil,err
	}
	err = s.Mongo.UpdateProfilePhoto(ctx,id.AccountId(aid),id.BlobId(""))
	if err != nil {
		s.Logger.Error("cannot clear profile photo", zap.Error(err))
		return nil, status.Error(codes.Internal, "")
	}
	return &rentalpb.ClearProfilePhotoResponse{},nil
}