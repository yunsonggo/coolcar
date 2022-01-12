package gunDao

import (
	gunpb "2021/coolcar/server/gun/api/gen/v1"
	"2021/coolcar/server/shared/id"
	"2021/coolcar/server/shared/mongoShare"
	"2021/coolcar/server/shared/mongoShare/objid"
	"context"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

const (
	gunField = "gun"
	statusField = gunField + ".status"
	driverField = gunField + ".driver"
	positionField = gunField + ".position"
	tripIdField = gunField + ".tripid"
)

type Mongo struct {
	col *mongo.Collection
}

func NewMongo(db *mongo.Database,colName string) *Mongo {
	return &Mongo{
		col:db.Collection(colName),
	}
}

type GunRecord struct {
	mongoShare.IdField `bson:"inline"`
	Gun *gunpb.Gun `bson:"gun"`
}

func (m *Mongo) CreateGun(ctx context.Context,req *gunpb.CreateGunRequest) (*GunRecord,error) {
	r := &GunRecord{
		Gun: &gunpb.Gun{
			Status:   gunpb.GunStatus_LOCKED,
			Type: req.Type,
			Class: req.Class,
			Position: &gunpb.Location{
				Latitude:  req.Position.Latitude,
				Longitude: req.Position.Longitude,
			},
		},
	}
	r.Id = mongoShare.NewObjectId()
	_,err := m.col.InsertOne(ctx,r)
	if err != nil {
		return nil,err
	}
	return r,nil
}

func (m *Mongo) GetGun(ctx context.Context,id id.GunId) (*GunRecord,error) {
	objId ,err := objid.FromId(id)
	if err != nil {
		return nil,err
	}
	return convertSingleResult(m.col.FindOne(ctx,bson.M{
		mongoShare.IdFieldName: objId,
	}))
}

func (m *Mongo) GetGunList(ctx context.Context) ([]*GunRecord,error) {
	filter := bson.M{}
	res, err := m.col.Find(ctx, filter, options.Find())
	if err != nil {
		return nil, err
	}
	var gunList []*GunRecord
	for res.Next(ctx) {
		var gun GunRecord
		err = res.Decode(&gun)
		if err != nil {
			return nil,err
		}
		gunList = append(gunList,&gun)
	}
	return gunList,nil
}

type GunUpdate struct {
	Status       gunpb.GunStatus
	Position     *gunpb.Location
	Driver       *gunpb.Driver
	UpdateTripID bool
	TripID       id.TripId
}

func (m *Mongo) UpdateGun (ctx context.Context,id id.GunId,status gunpb.GunStatus,update *GunUpdate) (*GunRecord,error) {
	objId,err := objid.FromId(id)
	if err != nil {
		return nil,err
	}
	filter := bson.M{
		mongoShare.IdFieldName: objId,
	}
	if status != gunpb.GunStatus_GS_NO_SPECIFIED {
		filter[statusField] = status
	}
	u := bson.M{}
	if update.Status != gunpb.GunStatus_GS_NO_SPECIFIED {
		u[statusField] = update.Status
	}
	if update.Driver != nil {
		u[driverField] = update.Driver
	}
	if update.Position != nil {
		u[positionField] = update.Position
	}
	if update.UpdateTripID {
		u[tripIdField] = update.TripID.String()
	}
	res := m.col.FindOneAndUpdate(ctx,filter,mongoShare.Set(u),
		options.FindOneAndUpdate().SetReturnDocument(options.After))
	return convertSingleResult(res)
}

func convertSingleResult(res *mongo.SingleResult) (*GunRecord,error) {
	if err := res.Err(); err != nil {
		return nil, err
	}
	var gr GunRecord
	err := res.Decode(&gr)
	if err != nil {
		return nil,err
	}
	return &gr,nil
}