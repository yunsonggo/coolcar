package grpcService

import (
	"2021/coolcar/server/shared/middleware"
	"go.uber.org/zap"
	"google.golang.org/grpc"
	"net"
)

type GRPCServerConf struct {
	ServerName string
	Addr string
	Logger *zap.Logger
	PublicKeyFilePath string
	RegisterServerFunc func (*grpc.Server)
}

func RunGRPCServer(gc *GRPCServerConf) error {
	lis,err := net.Listen("tcp",gc.Addr)
	if err != nil {
		gc.Logger.Fatal("初始化:" + gc.ServerName + " GRPC监听端口错误",zap.Error(err))
	}

	var opts []grpc.ServerOption
	if gc.PublicKeyFilePath != "" {
		inter,interErr := middleware.Interceptor(gc.PublicKeyFilePath)
		if interErr != nil {
			gc.Logger.Fatal("读取publicKey错误",zap.Error(interErr))
		}
		opts = append(opts,grpc.UnaryInterceptor(inter))
	}
	s := grpc.NewServer(opts...)
	gc.RegisterServerFunc(s)
	gc.Logger.Sugar().Info("GRPC服务:%s启动,地址:%s\n",gc.ServerName,gc.Addr)
	return s.Serve(lis)
}
