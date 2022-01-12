package trip

import (
	trippb "2021/coolcar/server/grpc-grpc_gateway-server-democode/proto/gen/go"
	"context"
)

type Service struct {}

func (*Service) GetTrip(c context.Context,req *trippb.GetTripRequest) (*trippb.GetTripResponse,error) {
	var trip1 = &trippb.Location{
		Latitude:  33,
		Longitude: 116,
	}
	var trip2 = &trippb.Location{
		Latitude:  34,
		Longitude: 117,
	}
	var path  []*trippb.Location
	path = append(path,trip1)
	path = append(path,trip2)

	var gun = &trippb.Gun{
		Id: "11",
		GunNum: "123456789",
		GunStyle: "97-1",
		GunClass: "一大队",
	}

	return &trippb.GetTripResponse{
		Id:  req.Id,
		Trip: &trippb.Trip{
			Start:       "aaa",
			End:         "bbb",
			DurationSec: 10000,
			DistanceKm:     20000,
			StartPos:    &trippb.Location{
				Latitude:  31,
				Longitude: 115,
			},
			EndPos:      &trippb.Location{
				Latitude: 32,
				Longitude: 116,
			},
			PathLocations: path,
			GunInfo:       gun,
			Status:        trippb.TripStatus_ON_FINISHED,
		},
	},nil
}
