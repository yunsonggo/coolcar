package mq

import (
	gunpb "2021/coolcar/server/gun/api/gen/v1"
	"context"
)

// Publisher defines the publish interface.
type Publisher interface {
	Publish(context.Context, *gunpb.GunEntity) error
}

// Subscriber defines a car update subscriber.
type Subscriber interface {
	Subscribe(context.Context) (ch chan *gunpb.GunEntity, cleanUp func(), err error)
}
