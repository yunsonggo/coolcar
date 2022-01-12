package testingShare

import (
	"context"
	"fmt"
	"github.com/docker/docker/api/types"
	"github.com/docker/docker/api/types/container"
	"github.com/docker/docker/client"
	"github.com/docker/go-connections/nat"
	"testing"
)

const (
	image = "mongo"
	containerPort = "27017/tcp"
)

func RunOnceMongoInDocker(m *testing.M,mongoURI *string) int {
	// 客户端实例
	dockerClient,err := client.NewClientWithOpts()
	if err != nil {
		panic(err)
	}
	ctx := context.Background()
	// 容器配置
	cfg := &container.Config{
		Image: image,
		ExposedPorts: nat.PortSet{
			containerPort: {},
		},
	}
	// 服务配置
	hostCfg := &container.HostConfig{
		PortBindings: nat.PortMap{
			containerPort:[]nat.PortBinding{
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
	containerId := res.ID
	defer func() {
		err = dockerClient.ContainerRemove(ctx,containerId,types.ContainerRemoveOptions{
			Force: true,
		})
		if err != nil {
			panic(err)
		}
	}()
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
	info := inspect.NetworkSettings.Ports[containerPort][0]
	*mongoURI = fmt.Sprintf("mongodb://%s:%s/",info.HostIP,info.HostPort)
	return m.Run()
}
