package main

import (
	gunpb "2021/coolcar/server/gun/api/gen/v1"
	"context"
	"fmt"
	"google.golang.org/grpc"
	"strconv"
)

func main() {
	conn,err := grpc.Dial("localhost:8093",grpc.WithInsecure())
	if err != nil {
		panic(err)
	}
	gs := gunpb.NewGunServiceClient(conn)
	c := context.Background()
	//CreateGuns(c,gs,5)
	ResetAllGuns(c,gs)
}

func CreateGuns(c context.Context,gs gunpb.GunServiceClient,num int) {
	for i:=0; i<=num;i++ {
		res,err := gs.CreateGun(c,&gunpb.CreateGunRequest{
			Type:     "AC-99",
			Class:    "押运二大队",
			CardId:   "202101234567890000" + strconv.Itoa(i),
		})
		if err != nil {
			panic(err)
		}
		fmt.Printf("create gun : %s\n",res.Id)
	}
}

func ResetAllGuns(c context.Context,gs gunpb.GunServiceClient) {
	res,err := gs.GetGunList(c,&gunpb.GetGunListRequest{})
	if err != nil {
		panic(err)
	}
	for _,gun := range res.GunList {
		_,err = gs.UpdateGun(c,&gunpb.UpdateGunRequest{
			Id:       gun.Id,
			Status:   gunpb.GunStatus_LOCKED,
			Position: gun.Gun.Position,
		})
		if err != nil {
			fmt.Printf("reset gun: %q err: %v\n",gun.Id,err)
			continue
		}
	}
	fmt.Printf("%d guns reset\n",len(res.GunList))
}