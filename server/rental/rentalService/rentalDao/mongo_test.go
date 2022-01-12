package rentalDao

import (
	rentalpb "2021/coolcar/server/rental/api/gen/v1"
	"2021/coolcar/server/shared/mongoShare/objid"
	"2021/coolcar/server/shared/testingShare"
	"context"
	"fmt"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"os"
	"testing"
)

var mongoURI string = "mongodb://localhost:27017"

func TestCreateTrip(t *testing.T) {
	c := context.Background()
	mc,err := mongo.Connect(c,options.Client().ApplyURI(mongoURI))
	if err != nil {
		t.Fatal(err)
	}
	m := NewMongo(mc.Database("coolcar"),"trip")
	tr,err:=m.CreateTrip(c,&rentalpb.Trip{
		AccountId: "account1",
		GunId:     "gun_id1",
		Start:     &rentalpb.LocationStatus{
			Location:     &rentalpb.Location{
				Latitude:  31.26555,
				Longitude: 115.23655,
			},
			LocationName: "物资小区",
			KmDriven:     0,
			FeeCent:      0,
		},
		Current:   nil,
		End:            &rentalpb.LocationStatus{
			Location:     &rentalpb.Location{
				Latitude:  31.27555,
				Longitude: 115.27655,
			},
			LocationName: "龙湖小区",
			KmDriven:     25,
			FeeCent:      20,
		},
		Status:    rentalpb.TripStatus_FINISHED,
	})
	if err != nil {
		t.Error(err)
	}
	t.Errorf("tr:%+v\n",tr)
	getRes,err := m.GetTrip(c,objid.ToTripId(tr.Id),"account1")
	if err != nil {
		t.Error(err)
	}
	t.Errorf("get tr: %+v\n",getRes)
}

func TestMain(m *testing.M) {
	os.Exit(testingShare.RunOnceMongoInDocker(m,&mongoURI))
}
