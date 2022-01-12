package main

import (
	blobpb "2021/coolcar/server/blob/api/gen/v1"
	"context"
	"fmt"
	"google.golang.org/grpc"
)

// 测试 腾讯云存储
func main() {
	conn,err := grpc.Dial("localhost:8092",grpc.WithInsecure())
	if err != nil {
		panic(err)
	}
	c := blobpb.NewBlobServiceClient(conn)
	ctx := context.Background()
	// 1 小程序中 使用res的upload_url上传图片到腾讯云 wx.request({...url:'/* res.upload_url */'})
	//res,err := c.CreateBlob(ctx,&blobpb.CreateBlobRequest{
	//	AccountId:        "account_2",
	//	UploadUrlTimeout: 5000,
	//})
	// 2 获取云存储图片二进制数据
	//res,err := c.GetBlob(ctx,&blobpb.GetBlobRequest{
	//	Id: "61db9ac63ae800e5a14fa069",
	//})
	// 3 获取云存储图片临时访问地址
	res,err := c.GetBlobURL(ctx,&blobpb.GetBlobURLRequest{
		Id:               "61db9ac63ae800e5a14fa069",
		UploadUrlTimeout: 500,
	})
	if err != nil {
		panic(err)
	}
	fmt.Printf("%+v\n",res)
}
