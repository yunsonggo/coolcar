package main

import (
	authpb "2021/coolcar/server/auth/api/gen/v1"
	gunpb "2021/coolcar/server/gun/api/gen/v1"
	rentalpb "2021/coolcar/server/rental/api/gen/v1"
	"2021/coolcar/server/shared/middleware"
	"2021/coolcar/server/shared/until"
	"context"
	"github.com/namsral/flag"
	"log"
	"net/http"
	"net/textproto"

	"github.com/grpc-ecosystem/grpc-gateway/v2/runtime"
	"google.golang.org/grpc"
	"google.golang.org/protobuf/encoding/protojson"
)

var (
	addr        = flag.String("addr", ":8080", "gateway服务监听地址")
	authAddr    = flag.String("auth_addr", "localhost:8090", "auth身份验证服务监听地址")
	tripAddr    = flag.String("trip_addr", "localhost:8091", "trip行程服务监听地址")
	profileAddr = flag.String("profile_addr", "localhost:8091", "profile资格验证监听地址")
	gunAddr     = flag.String("gun_addr", "localhost:8093", "gun物品服务监听地址")
)

func main() {
	flag.Parse()
	logger, err := until.NewZapLogger()
	if err != nil {
		log.Fatalf("初始化日志出错:%v\n", err)
	}
	c, cancel := context.WithCancel(context.Background())
	defer cancel()
	//mux := runtime.NewServeMux(runtime.WithMarshalerOption(
	//	runtime.MIMEWildcard,
	//	&runtime.JSONPb{
	//		MarshalOptions:   protojson.MarshalOptions{UseProtoNames: true,UseEnumNumbers: true},
	//		UnmarshalOptions: protojson.UnmarshalOptions{},
	//	}),
	//)
	mux := runtime.NewServeMux(runtime.WithMarshalerOption(
		runtime.MIMEWildcard, &runtime.JSONPb{
			MarshalOptions:   protojson.MarshalOptions{UseProtoNames: true, UseEnumNumbers: true},
			UnmarshalOptions: protojson.UnmarshalOptions{},
		},
	), runtime.WithIncomingHeaderMatcher(func(key string) (string, bool) {
		if key == textproto.CanonicalMIMEHeaderKey(runtime.MetadataHeaderPrefix+middleware.ImpersonateAccountHeader) {
			return "", false
		}
		return runtime.DefaultHeaderMatcher(key)
	}))
	gatewayServerConf := []struct {
		serverName   string
		addr         string
		registerFunc func(ctx context.Context, mux *runtime.ServeMux, endpoint string, opts []grpc.DialOption) (err error)
	}{
		{
			serverName:   "gateway登录:auth服务",
			addr:         *authAddr,
			registerFunc: authpb.RegisterAuthServiceHandlerFromEndpoint,
		},
		{
			serverName:   "gateway行程:rental_trip服务",
			addr:         *tripAddr,
			registerFunc: rentalpb.RegisterTripServiceHandlerFromEndpoint,
		},
		{
			serverName:   "gateway行程:rental_profile服务",
			addr:         *profileAddr,
			registerFunc: rentalpb.RegisterProfileServiceHandlerFromEndpoint,
		},
		{
			serverName:   "gateway枪:gun服务",
			addr:         *gunAddr,
			registerFunc: gunpb.RegisterGunServiceHandlerFromEndpoint,
		},
	}

	for _, s := range gatewayServerConf {
		err = s.registerFunc(c, mux, s.addr, []grpc.DialOption{grpc.WithInsecure()})
		if err != nil {
			logger.Sugar().Fatalf("注册%s错误:%v\n", s.serverName, err)
		}
		logger.Sugar().Infof("%s连接服务:%s\n", s.serverName, s.addr)
	}
	logger.Sugar().Infof("gateway服务启动,监听 %s\n", *addr)
	log.Fatal(http.ListenAndServe(*addr, mux))
}
