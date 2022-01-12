package main

import (
	authpb "2021/coolcar/server/auth/api/gen/v1"
	"2021/coolcar/server/auth/api/wechat"
	"2021/coolcar/server/auth/authService"
	"2021/coolcar/server/auth/dao"
	"2021/coolcar/server/auth/token"
	"2021/coolcar/server/shared/grpcService"
	"2021/coolcar/server/shared/until"
	"context"
	"github.com/dgrijalva/jwt-go"
	"github.com/namsral/flag"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.uber.org/zap"
	"google.golang.org/grpc"
	"io/ioutil"
	"log"
	"os"
	"time"
)

var (
	addr           = flag.String("addr", ":8090", "auth身份验证服务监听地址")
	mongoURI       = flag.String("mongo_uri", "mongodb://root:root@localhost:27017/", "mongodb连接地址")
	privateKeyPath = flag.String("private_key_path", "auth/conf/private.key", "privateKey file path 私钥文件路径")
	wechatAppId    = flag.String("wechat_app_id", "wx114bd51c36a971c7", "微信小程序APPID")
	wechatSecret   = flag.String("wechat_secret", "b1585e934ea63e0355ffccd67fb66b74", "微信小程序秘钥")
)

func main() {
	flag.Parse()

	logger, err := until.NewZapLogger()
	if err != nil {
		log.Fatalf("初始化日志出错:%v\n", err)
	}
	var appId = *wechatAppId
	var secret = *wechatSecret
	ctx := context.Background()
	mongoClient, err := mongo.Connect(ctx, options.Client().ApplyURI(*mongoURI))
	if err != nil {
		logger.Error("连接数据库失败", zap.Error(err))
		return
	}
	privateKeyFile, err := os.Open(*privateKeyPath)
	if err != nil {
		logger.Fatal("打开private.key文件错误", zap.Error(err))
		return
	}
	defer privateKeyFile.Close()
	privateByte, err := ioutil.ReadAll(privateKeyFile)
	if err != nil {
		logger.Fatal("读取private.key文件错误", zap.Error(err))
		return
	}
	privateKey, err := jwt.ParseRSAPrivateKeyFromPEM(privateByte)
	if err != nil {
		logger.Error("jwt parse private.key错误", zap.Error(err))
		return
	}
	err = grpcService.RunGRPCServer(&grpcService.GRPCServerConf{
		ServerName: "GRPC:Auth服务",
		Addr:       *addr,
		Logger:     logger,
		RegisterServerFunc: func(s *grpc.Server) {
			authpb.RegisterAuthServiceServer(s, &authService.Server{
				Logger: logger,
				ResolveOpenId: &wechat.Service{
					AppId:  appId,
					Secret: secret,
				},
				Mongo:       dao.NewMongo(mongoClient.Database("coolcar"), "account"),
				TokenExpire: 2 * time.Hour,
				GenToken:    token.NewJWTGen("coolcar/auth", privateKey),
			})
		},
	})
	if err != nil {
		logger.Fatal("启动auth服务失败", zap.Error(err))
	}
}
