package main

import (
	"context"
	"fmt"
	"github.com/docker/docker/api/types"
	"github.com/docker/docker/api/types/container"
	"github.com/docker/docker/client"
	"github.com/docker/go-connections/nat"
	"time"
)

// go get github.com/docker/docker/client
// golang docker 客户端 创建全新容器 并删除
func main() {
	// 客户端实例
	dockerClient,err := client.NewClientWithOpts()
	if err != nil {
		panic(err)
	}
	ctx := context.Background()
	// 容器配置
	cfg := &container.Config{
		Image: "mongo",
		ExposedPorts: nat.PortSet{
			"27017/tcp":{},
		},
	}
	// 服务配置
	hostCfg := &container.HostConfig{
		PortBindings: nat.PortMap{
			"27017/tcp":[]nat.PortBinding{
				{
					HostIP: "127.0.0.1",
					HostPort: "0",
				},
			},
		},
	}
	// 创建容器
	res,err := dockerClient.ContainerCreate(ctx,cfg,hostCfg,nil,nil,"")
	if err != nil {
		panic(err)
	}
	// 启动容器
	err = dockerClient.ContainerStart(ctx,res.ID,types.ContainerStartOptions{})
	if err != nil {
		panic(err)
	}
	// 容器信息
	inspect,err := dockerClient.ContainerInspect(ctx,res.ID)
	if err != nil {
		panic(err)
	}
	info := inspect.NetworkSettings.Ports["27017/tcp"][0]
	fmt.Printf("go docker start mongo Id:%v\n,info:%+v\n,after 20sec stop and remove",res.ID,info)
	time.Sleep(time.Second * 20)
	// 关闭并删除容器
	err = dockerClient.ContainerRemove(ctx,res.ID,types.ContainerRemoveOptions{
		Force: true,
	})
	if err != nil {
		panic(err)
	}
	fmt.Println("remove container id:",res.ID)
}


//func createAndRemoveDockerMongo() {
//	// 客户端实例
//	dockerClient,err := client.NewClientWithOpts()
//	if err != nil {
//		panic(err)
//	}
//	ctx := context.Background()
//	// 容器配置
//	cfg := &container.Config{
//		Image: "mongo",
//		ExposedPorts: nat.PortSet{
//			"27017/tcp":{},
//		},
//	}
//	// 服务配置
//	hostCfg := &container.HostConfig{
//		PortBindings: nat.PortMap{
//			"27017/tcp":[]nat.PortBinding{
//				{
//					HostIP: "127.0.0.1",
//					HostPort: "0",
//				},
//			},
//		},
//	}
//	// 创建容器
//	res,err := dockerClient.ContainerCreate(ctx,cfg,hostCfg,nil,nil,"")
//	if err != nil {
//		panic(err)
//	}
//	// defer 关闭并删除容器
//	defer func() {
//		err = dockerClient.ContainerRemove(ctx,res.ID,types.ContainerRemoveOptions{
//			Force: true,
//		})
//		if err != nil {
//			panic(err)
//		}
//		fmt.Println("remove container id:",res.ID)
//	}()
//	// 启动容器
//	err = dockerClient.ContainerStart(ctx,res.ID,types.ContainerStartOptions{})
//	if err != nil {
//		panic(err)
//	}
//	// 容器信息
//	inspect,err := dockerClient.ContainerInspect(ctx,res.ID)
//	if err != nil {
//		panic(err)
//	}
//	info := inspect.NetworkSettings.Ports["27017/tcp"][0]
//	fmt.Printf("go docker start mongo Id:%v\n,info:%+v\n,after 20sec stop and remove",res.ID,info)
//	mongoURI = fmt.Sprintf("mongodb://root:root@%s:%s/",info.HostIP,info.HostPort)
//}
