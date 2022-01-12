package trip

import (
	gunpb "2021/coolcar/server/gun/api/gen/v1"
	"2021/coolcar/server/gun/mq"
	rentalpb "2021/coolcar/server/rental/api/gen/v1"
	"2021/coolcar/server/shared/id"
	"2021/coolcar/server/shared/middleware"
	"context"
	"go.uber.org/zap"
)

func RunUpdater(sub mq.Subscriber,ts rentalpb.TripServiceClient,logger *zap.Logger) {
	ch,cleanUp,err := sub.Subscribe(context.Background())
	if err != nil {
		logger.Fatal("cannot subscribe", zap.Error(err))
	}
	defer cleanUp()
	for gun := range ch {
		if gun.Gun.Status == gunpb.GunStatus_UNLOCKED &&
			gun.Gun.TripId != "" && gun.Gun.Driver.Id != "" {
			//_,err = ts.UpdateTrip(context.Background(),&rentalpb.UpdateTripRequest{
			//	Id:      gun.Gun.TripId,
			//	Current: &rentalpb.LocationStatus{
			//		Location:&rentalpb.Location{
			//			Latitude:  gun.Gun.Position.Latitude,
			//			Longitude: gun.Gun.Position.Longitude,
			//		},
			//		TimestampSec: time.Now().Unix(),
			//	},
			//},grpc.PerRPCCredentials(&impersonation{
			//	AccountId: id.AccountId(gun.Gun.Driver.Id),
			//}))
			//if err != nil {
			//	logger.Error("cannot update trip", zap.String("trip_id", gun.Gun.TripId), zap.Error(err))
			//}
		}
	}
}

type impersonation struct {
	AccountId id.AccountId
}

func (i *impersonation) GetRequestMetadata(ctx context.Context, uri ...string) (map[string]string, error) {
	return map[string]string {
		middleware.ImpersonateAccountHeader:i.AccountId.String(),
	},nil
}

func (i *impersonation) RequireTransportSecurity() bool {
	return false
}
