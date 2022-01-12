package rentalDao

import (
	rentalpb "2021/coolcar/server/rental/api/gen/v1"
	"2021/coolcar/server/shared/id"
	"2021/coolcar/server/shared/mongoShare"
	"2021/coolcar/server/shared/mongoShare/objid"
	"context"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

const (
	tripField = "trip"
	accountIdFiled = tripField + ".accountid"
	statusField = tripField + ".status"
)

type Mongo struct {
	col *mongo.Collection
}

func NewMongo(db *mongo.Database,colName string) *Mongo {
	return &Mongo{
		col:db.Collection(colName),
	}
}

type TripRecord struct {
	mongoShare.IdField `bson:"inline"`
	mongoShare.UpdatedAtField `bson:"inline"`
	Trip *rentalpb.Trip `bson:"trip"`
}
// 新建一条数据入数据库
func (m *Mongo) CreateTrip(ctx context.Context,trip *rentalpb.Trip) (*TripRecord,error) {
	r := &TripRecord{
		Trip:           trip,
	}
	r.Id = mongoShare.NewObjectId()
	r.UpdatedAt = mongoShare.UpdatedAt()
	_,err := m.col.InsertOne(ctx,r)
	if err != nil {
		return nil,err
	}
	return r,nil
}
// 根据tripId accountId 查询一条数据
func (m *Mongo) GetTrip(ctx context.Context,id id.TripId,accountId id.AccountId) (*TripRecord,error) {
	objId,err := objid.FromId(id)
	if err != nil {
		return nil,err
	}
	res := m.col.FindOne(ctx,bson.M{
		mongoShare.IdFieldName: objId,
		accountIdFiled:accountId,
	})
	if err = res.Err();err != nil {
		return nil,err
	}
	var tr TripRecord
	err = res.Decode(&tr)
	if err != nil {
		return nil,err
	}
	return &tr,nil
}
// 设置状态 根据状态查找列表 没有状态则查找全部
// TripStatus_TS_NOT_SPECIFIED = 0
func (m *Mongo) GetTripList(ctx context.Context,accountId id.AccountId,status rentalpb.TripStatus) ([]*TripRecord,error) {
	filter := bson.M{
		accountIdFiled: accountId.String(),
	}
	if status != rentalpb.TripStatus_TS_NOT_SPECIFIED {
		filter[statusField] = status
	}
	res,err := m.col.Find(ctx,filter)
	if err != nil {
		return nil,err
	}
	var trips []*TripRecord
	for res.Next(ctx) {
		var trip TripRecord
		decodeErr := res.Decode(&trip)
		if decodeErr != nil {
			err = decodeErr
			continue
		}
		trips = append(trips,&trip)
	}
	return trips,err
}
// 更新数据
func (m *Mongo) UpdateTrip(ctx context.Context,tid id.TripId,aid id.AccountId,updatedAt int64,trip *rentalpb.Trip) (err error) {
	objId,err := objid.FromId(tid)
	if err != nil {
		return err
	}
	newUpdatedAt := mongoShare.UpdatedAt()
	res,err := m.col.UpdateOne(ctx,bson.M{
		mongoShare.IdFieldName: objId,
		accountIdFiled: aid.String(),
		mongoShare.UpdatedAtFieldName: updatedAt,
	},mongoShare.Set(bson.M{
		tripField: trip,
		mongoShare.UpdatedAtFieldName: newUpdatedAt,
	}))
	if err != nil {
		return
	}
	if res.MatchedCount == 0 {
		return mongo.ErrNoDocuments
	}
	return nil
}
