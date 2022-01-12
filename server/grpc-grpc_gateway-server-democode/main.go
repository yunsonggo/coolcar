package main

import (
	trippb "2021/coolcar/server/grpc-grpc_gateway-server-democode/proto/gen/go"
	"2021/coolcar/server/grpc-grpc_gateway-server-democode/trip"
	"context"
	"github.com/grpc-ecosystem/grpc-gateway/v2/runtime"
	"google.golang.org/grpc"
	"google.golang.org/protobuf/encoding/protojson"
	"log"
	"net"
	"net/http"
)
// grpc服务
func main() {
	// 启动grpc-gateway服务 监听http :8080
	go startGateway()

	// grpc 网络监听 grpc :8090
	lis,err := net.Listen("tcp",":8090")
	if err != nil {
		log.Fatalln(err)
	}
	// 实例grpc服务
	s := grpc.NewServer()
	// 注册grpc服务到方法
	trippb.RegisterTripServiceServer(s,&trip.Service{})
	// 启用服务
	err = s.Serve(lis)
	if err != nil {
		log.Fatalln(err)
	}
}
// 启动Gateway服务
func startGateway() {
	c,cancel := context.WithCancel(context.Background())
	defer cancel()
	// 1对多分发器 grpc-gateway/runtime
	mux := runtime.NewServeMux(runtime.WithMarshalerOption(
		runtime.MIMEWildcard,&runtime.JSONPb{
			MarshalOptions:   protojson.MarshalOptions{UseProtoNames: true,UseEnumNumbers: true},
			UnmarshalOptions: protojson.UnmarshalOptions{},
		},
	))
	// grpc监听端口
	endPoint := ":8090"
	// 注册grpc-gateway服务到grpc服务
	err := trippb.RegisterTripServiceHandlerFromEndpoint(
		c,
		mux,
		endPoint,
		[]grpc.DialOption{grpc.WithInsecure()},
		)
	if err != nil {
		log.Fatalln(err)
	}
	// 开启grpc-gateway服务监听
	err = http.ListenAndServe(":8080",mux)
	if err != nil {
		log.Fatalln(err)
	}
}

