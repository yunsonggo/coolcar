package main

import (
	trippb "2021/coolcar/server/grpc-grpc_gateway-server-democode/proto/gen/go"
	"context"
	"fmt"
	"google.golang.org/grpc"
	"log"
)

func main() {
	conn,err := grpc.Dial("localhost:8090",grpc.WithInsecure())
	if err != nil {
		log.Fatalln(err)
	}
	tsClient := trippb.NewTripServiceClient(conn)
	res,resErr := tsClient.GetTrip(context.Background(),&trippb.GetTripRequest{
		Id:"trip111",
	})
	if resErr != nil {
		log.Fatalln(resErr)
	}
	fmt.Println(res)
}


