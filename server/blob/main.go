package main

import (
	blobpb "2021/coolcar/server/blob/api/gen/v1"
	"2021/coolcar/server/blob/blobDao"
	"2021/coolcar/server/blob/blobService"
	"2021/coolcar/server/blob/cos"
	"2021/coolcar/server/shared/grpcService"
	"2021/coolcar/server/shared/until"
	"context"
	"github.com/namsral/flag"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.uber.org/zap"
	"google.golang.org/grpc"
	"log"
)

var (
	addr            = flag.String("addr", ":8092", "图片服务监听地址")
	mongoURI        = flag.String("mongo_uri", "mongodb://root:root@localhost:27017/", "mongodb连接地址")
	bucketAddr      = flag.String("bucket_addr", "https://coolcar-1305583799.cos.ap-beijing.myqcloud.com", "云存储服务地址")
	bucketSecId     = flag.String("bucket_sec_id", "AKIDQecKlvnQmrfDVVEhsmPkoa5JHyOWP3RX", "云存储秘钥ID")
	bucketSecSecret = flag.String("bucket_sec_secret", "xd2A0atwiERRBwShfMnxrUszpOghRxEG", "云存储秘钥密码")
)

func main() {
	flag.Parse()

	logger, err := until.NewZapLogger()
	if err != nil {
		log.Fatalf("初始化日志出错:%v\n", err)
	}
	ctx := context.Background()
	mongoClient, err := mongo.Connect(ctx, options.Client().ApplyURI(*mongoURI))
	if err != nil {
		logger.Error("连接数据库失败", zap.Error(err))
		return
	}
	tencentBucketAddr := *bucketAddr
	tencentBucketSecId := *bucketSecId
	tencentBucketSecSecret := *bucketSecSecret
	tencentCosServer, err := cos.NewTencentCosServer(tencentBucketAddr, tencentBucketSecId, tencentBucketSecSecret)
	if err != nil {
		logger.Error("连接腾讯云存储服务失败", zap.Error(err))
		return
	}
	err = grpcService.RunGRPCServer(&grpcService.GRPCServerConf{
		ServerName: "GRPC图片服务",
		Addr:       *addr,
		Logger:     logger,
		RegisterServerFunc: func(s *grpc.Server) {
			blobpb.RegisterBlobServiceServer(s, &blobService.BlobServer{
				Mongo:   blobDao.NewMongo(mongoClient.Database("coolcar"), "blob"),
				Logger:  logger,
				Storage: tencentCosServer,
			})
		},
	})
	if err != nil {
		logger.Fatal("启动图片服务失败", zap.Error(err))
	}
}
