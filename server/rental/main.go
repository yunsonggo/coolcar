package main

import (
	blobpb "2021/coolcar/server/blob/api/gen/v1"
	gunpb "2021/coolcar/server/gun/api/gen/v1"
	rentalpb "2021/coolcar/server/rental/api/gen/v1"
	"2021/coolcar/server/rental/profileService"
	"2021/coolcar/server/rental/profileService/profileDao"
	"2021/coolcar/server/rental/rentalService"
	"2021/coolcar/server/rental/rentalService/client/gun"
	"2021/coolcar/server/rental/rentalService/client/poi"
	"2021/coolcar/server/rental/rentalService/client/profile"
	"2021/coolcar/server/rental/rentalService/rentalDao"
	"2021/coolcar/server/shared/grpcService"
	"2021/coolcar/server/shared/until"
	"context"
	"github.com/namsral/flag"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.uber.org/zap"
	"google.golang.org/grpc"
	"log"
	"time"
)

var (
	addr          = flag.String("addr", ":8091", "行程服务监听地址")
	mongoURI      = flag.String("mongo_uri", "mongodb://root:root@localhost:27017/", "mongodb连接地址")
	blobAddr      = flag.String("blob_addr", ":8092", "云存储服务地址")
	gunAddr       = flag.String("gun_addr", ":8093", "物品服务监听地址")
	publicKeyPath = flag.String("public_key_path", "shared/middleware/public.key", "publicKey文件路径")
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
	// blob server client
	blobConn, err := grpc.Dial(*blobAddr, grpc.WithInsecure())
	if err != nil {
		logger.Fatal("dial blob server err", zap.Error(err))
	}

	// profile server
	ps := &profileService.Server{
		Logger:            logger,
		Mongo:             profileDao.NewMongo(mongoClient.Database("coolcar"), "profile"),
		BlobClient:        blobpb.NewBlobServiceClient(blobConn),
		PhotoUploadExpire: 10 * time.Second,
		PhotoGetExpire:    15 * time.Second,
	}
	gunConn, err := grpc.Dial(*gunAddr, grpc.WithInsecure())
	if err != nil {
		logger.Fatal("dial gun server err", zap.Error(err))
	}

	err = grpcService.RunGRPCServer(&grpcService.GRPCServerConf{
		ServerName:        "GRPC行程服务",
		Addr:              *addr,
		Logger:            logger,
		PublicKeyFilePath: *publicKeyPath,
		RegisterServerFunc: func(s *grpc.Server) {
			rentalpb.RegisterTripServiceServer(s, &rentalService.Server{
				GunManager: &gun.Manager{
					GunService: gunpb.NewGunServiceClient(gunConn),
				},
				ProfileManager: &profile.Manager{
					Fetcher: ps,
				},
				POIManager: &poi.Manager{},
				Mongo:      rentalDao.NewMongo(mongoClient.Database("coolcar"), "trip"),
				Logger:     logger,
			})
			rentalpb.RegisterProfileServiceServer(s, ps)
		},
	})
	if err != nil {
		logger.Fatal("启动trip服务失败", zap.Error(err))
	}
}
