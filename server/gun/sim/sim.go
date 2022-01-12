package sim

import (
	gunpb "2021/coolcar/server/gun/api/gen/v1"
	"2021/coolcar/server/gun/mq/amqpclt"
	"context"
	"go.uber.org/zap"
	"time"
)

type Controller struct {
	GunSimService gunpb.GunServiceClient
	Logger *zap.Logger
	Subscriber *amqpclt.Subscriber
}

func (c *Controller) RunSimulations(ctx context.Context) {
	var guns []*gunpb.GunEntity
	for {
		time.Sleep(2 * time.Second)
		res,err := c.GunSimService.GetGunList(ctx,&gunpb.GetGunListRequest{})
		if err != nil {
			c.Logger.Error("get gun list error",zap.Error(err))
			continue
		}
		guns = res.GunList
		break
	}
	c.Logger.Info("Running gun simulations.", zap.Int("gun_count", len(guns)))
	msgCh,cleanUp,err := c.Subscriber.Subscribe(ctx)
	if err != nil {
		c.Logger.Error("subscribe in run sim error",zap.Error(err))
		return
	}
	defer cleanUp()
	gunChans := make(map[string]chan *gunpb.Gun)
	for _,gun := range guns {
		ch := make(chan *gunpb.Gun)
		gunChans[gun.Id] = ch
		go c.SimulateGun(context.Background(),ch,gun)
	}

	for gunUpdate := range msgCh {
		ch := gunChans[gunUpdate.Id]
		if ch != nil {
			ch <- gunUpdate.Gun
		}
	}

}

func (c *Controller) SimulateGun (ctx context.Context,ch chan *gunpb.Gun,initial *gunpb.GunEntity) {
	gunId := initial.Id // 初始值
	for update := range ch {
		if update.Status == gunpb.GunStatus_UNLOCKING {
			_,err := c.GunSimService.UpdateGun(ctx,&gunpb.UpdateGunRequest{
				Id:       gunId,
				Status:   gunpb.GunStatus_UNLOCKED,
			})
			if err != nil {
				c.Logger.Error("开锁失败",zap.Error(err))
			}
		} else if update.Status == gunpb.GunStatus_LOCKING {
			_,err := c.GunSimService.UpdateGun(ctx,&gunpb.UpdateGunRequest{
				Id:       gunId,
				Status:   gunpb.GunStatus_LOCKED,
			})
			if err != nil {
				c.Logger.Error("锁枪失败",zap.Error(err))
			}
		}
	}
}