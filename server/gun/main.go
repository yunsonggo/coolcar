package main

import (
	gunpb "2021/coolcar/server/gun/api/gen/v1"
	"2021/coolcar/server/gun/gunDao"
	"2021/coolcar/server/gun/gunService"
	"2021/coolcar/server/gun/mq/amqpclt"
	"2021/coolcar/server/gun/sim"
	"2021/coolcar/server/gun/trip"
	"2021/coolcar/server/gun/ws"
	rentalpb "2021/coolcar/server/rental/api/gen/v1"
	"2021/coolcar/server/shared/grpcService"
	"2021/coolcar/server/shared/until"
	"context"
	"github.com/gorilla/websocket"
	"github.com/namsral/flag"
	"github.com/streadway/amqp"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.uber.org/zap"
	"google.golang.org/grpc"
	"log"
	"net/http"
)

var (
	addr     = flag.String("addr", ":8093", "物品服务监听地址")
	mongoURI = flag.String("mongo_uri", "mongodb://root:root@localhost:27017/", "mongodb连接地址")
	amqpAddr = flag.String("amqp_addr", "amqp://guest:guest@localhost:5672/", "rabbitmq服务地址")
	tripAddr = flag.String("trip_addr", ":8091", "trip行程服务监听地址")
	gunAddr  = flag.String("gun_addr", ":8093", "物品服务监听地址")
	wsAddr   = flag.String("ws_addr", ":9090", "websocket协议服务监听地址")
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
	amqpConn, err := amqp.Dial(*amqpAddr)
	if err != nil {
		logger.Fatal("cannot dial amqp", zap.Error(err))
	}
	exchange := "coolcar"
	pub, err := amqpclt.NewPublisher(amqpConn, exchange)
	if err != nil {
		logger.Fatal("cannot create publisher", zap.Error(err))
	}
	tripConn, err := grpc.Dial(*tripAddr, grpc.WithInsecure())
	if err != nil {
		logger.Fatal("cannot dial trip server", zap.Error(err))
	}
	sub, err := amqpclt.NewSubscriber(amqpConn, exchange, logger)
	if err != nil {
		logger.Fatal("cannot create subscriber", zap.Error(err))
	}

	gunConn, err := grpc.Dial(*gunAddr, grpc.WithInsecure())
	if err != nil {
		logger.Fatal("cannot dial gun server", zap.Error(err))
	}
	go trip.RunUpdater(sub, rentalpb.NewTripServiceClient(tripConn), logger)

	simController := &sim.Controller{
		GunSimService: gunpb.NewGunServiceClient(gunConn),
		Logger:        logger,
		Subscriber:    sub,
	}
	go simController.RunSimulations(context.Background())
	// websocket
	u := &websocket.Upgrader{
		CheckOrigin: func(r *http.Request) bool {
			return true
		},
	}
	http.HandleFunc("/ws", ws.Handler(u, sub, logger))
	go func() {
		logger.Sugar().Infof("websocket server listen %s/ws", *wsAddr)
		logger.Sugar().Fatal(http.ListenAndServe(*wsAddr, nil))
	}()

	err = grpcService.RunGRPCServer(&grpcService.GRPCServerConf{
		ServerName: "GRPC枪服务",
		Addr:       *addr,
		Logger:     logger,
		RegisterServerFunc: func(s *grpc.Server) {
			gunpb.RegisterGunServiceServer(s, &gunService.Service{
				Logger:    logger,
				Mongo:     gunDao.NewMongo(mongoClient.Database("coolcar"), "gun"),
				Publisher: pub,
			})
		},
	})
}
