package gun

import (
	gunpb "2021/coolcar/server/gun/api/gen/v1"
	rentalpb "2021/coolcar/server/rental/api/gen/v1"
	"2021/coolcar/server/shared/id"
	"context"
	"fmt"
)

type Manager struct {
	GunService gunpb.GunServiceClient
}

func (gm *Manager) Verify(ctx context.Context,gunId id.GunId,location *rentalpb.Location) error {
	gun,err := gm.GunService.GetGun(ctx,&gunpb.GetGunRequest{Id: gunId.String()})
	if err != nil {
		return fmt.Errorf("cannot get gun %v\n", err)
	}
	if gun.Status != gunpb.GunStatus_LOCKED {
		return fmt.Errorf("cannot unlock; gun status is %v\n", gun.Status)
	}
	return nil
}
func (gm *Manager) Unlock(ctx context.Context,gunId id.GunId,aid id.AccountId,tid id.TripId,avatarUrl string) error {
	_,err := gm.GunService.UnlockGun(ctx,&gunpb.UnlockGunRequest{
		Id:     gunId.String(),
		Driver: &gunpb.Driver{
			Id:        aid.String(),
			AvatarUrl: avatarUrl,
		},
		TripId: tid.String(),
	})
	if err != nil {
		return fmt.Errorf("cannot unlock: %v", err)
	}
	return nil
}

func (gm *Manager) Lock(ctx context.Context,gunId id.GunId) error {
	_,err := gm.GunService.LockGun(ctx,&gunpb.LockGunRequest{
		Id: gunId.String(),
	})
	if err != nil {
		return fmt.Errorf("cannot lock: %v", err)
	}
	return nil
}