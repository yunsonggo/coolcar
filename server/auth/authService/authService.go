package authService

import (
	authpb "2021/coolcar/server/auth/api/gen/v1"
	"2021/coolcar/server/auth/dao"
	"context"
	"go.uber.org/zap"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"time"
)

// 连接微信服务 code 到后台换取 openId, sessionKey, unionId
type OpenIdResolver interface {
	Recolver(code string) (openId string,err error)
}

// 给accountID签名 生成 jwt token
type TokenGenerator interface {
	GenerateToken(accountId string,expire time.Duration) (token string,err error)
}


type Server struct {
	Logger *zap.Logger
	ResolveOpenId OpenIdResolver
	GenToken TokenGenerator
	TokenExpire time.Duration
	Mongo *dao.Mongo
}

func (as *Server) Login(ctx context.Context,req *authpb.LoginRequest) (res *authpb.LoginResponse,err error)  {
	as.Logger.Info("接收 wx.Login => res.code",zap.String("code",req.Code))
	openId,err := as.ResolveOpenId.Recolver(req.Code)
	if err != nil {
		as.Logger.Error("获取openId失败",zap.Error(err))
		return nil,status.Errorf(codes.Unavailable,"访问微信后台错误:%v\n",err)
	}
	accountId,err := as.Mongo.ResolveAccountId(ctx,openId)
	if err != nil {
		as.Logger.Error("获取accountId失败",zap.Error(err))
		return nil,status.Error(codes.Internal,"获取accountId失败")
	}
	// 签名accountId
	token,err := as.GenToken.GenerateToken(accountId,as.TokenExpire)
	if err != nil {
		as.Logger.Error("生成token失败",zap.Error(err))
		return nil,status.Error(codes.Internal,"生成token失败")
	}

	return &authpb.LoginResponse{
		AccessToken: token,
		ExpiresIn:   int32(as.TokenExpire.Seconds()),
	},nil
	// 到后台换取 openId, sessionKey, unionId
}
