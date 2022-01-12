package profile

import (
	rentalpb "2021/coolcar/server/rental/api/gen/v1"
	"2021/coolcar/server/shared/id"
	"context"
	"encoding/base64"
	"google.golang.org/protobuf/proto"
)

type Fetcher interface {
	GetProfile(ctx context.Context, req *rentalpb.GetProfileRequest) (*rentalpb.Profile, error)
}

type Manager struct {
	Fetcher Fetcher
}

func (pm *Manager) Verify(ctx context.Context,accountId id.AccountId) (id.IdentityId,error) {
	nilID := id.IdentityId("")
	p,err := pm.Fetcher.GetProfile(ctx,&rentalpb.GetProfileRequest{})
	if err != nil {
		return nilID,err
	}
	if p.IdentityStatus != rentalpb.IdentityStatus_VERIFIED {
		return nilID,err
	}
	// 编码p.Identity
	b,err := proto.Marshal(p.Identity)
	if err != nil {
		return nilID,err
	}
	return id.IdentityId(base64.StdEncoding.EncodeToString(b)),nil
}