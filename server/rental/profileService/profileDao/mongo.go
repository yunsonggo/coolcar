package profileDao

import (
	rentalpb "2021/coolcar/server/rental/api/gen/v1"
	"2021/coolcar/server/shared/id"
	"2021/coolcar/server/shared/mongoShare"
	"context"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

const (
	accountIdField = "accountid"
	profileField = "profile"
	identityStatusField = profileField + ".identitystatus"
	photoBlobIdField = "photoblobid"
)

type Mongo struct {
	col *mongo.Collection
}

func NewMongo(db *mongo.Database,colName string) *Mongo {
	return &Mongo{
		col:db.Collection(colName),
	}
}

type ProfileRecord struct {
	AccountId string `bson:"accountid"`
	Profile *rentalpb.Profile `bson:"profile"`
	PhotoBlobId string `bson:"photoblobid"`
}

func (m *Mongo) GetProfile (ctx context.Context,aid id.AccountId) (*ProfileRecord,error) {
	res := m.col.FindOne(ctx,byAccountId(aid))
	if err := res.Err(); err != nil {
		return nil,err
	}
	var pr ProfileRecord
	err := res.Decode(&pr)
	if err != nil {
		return nil,err
	}
	return &pr,nil
}

// 新建或更新profile记录
func (m *Mongo) UpdateProfile (ctx context.Context,aid id.AccountId,prevState rentalpb.IdentityStatus,profile *rentalpb.Profile) (err error) {
	filter := bson.M{
		identityStatusField: prevState,
	}
	if prevState == rentalpb.IdentityStatus_UN_SUBMITTED {
		filter = mongoShare.ZeroValueOrNotExist(identityStatusField,prevState)
	}
	filter[accountIdField] = aid.String()

	_,err = m.col.UpdateOne(ctx,filter,mongoShare.Set(bson.M{
		accountIdField: aid.String(),
		profileField: profile,
	}),options.Update().SetUpsert(true))

	return
}

// 创建profile photo 记录
func (m *Mongo) UpdateProfilePhoto(ctx context.Context,aid id.AccountId,bid id.BlobId) (err error) {
	_,err = m.col.UpdateOne(ctx,bson.M{
		accountIdField: aid.String(),
	},mongoShare.Set(bson.M{
		accountIdField: aid.String(),
		photoBlobIdField: bid.String(),
	}),options.Update().SetUpsert(true))
	return
}

func byAccountId(aid id.AccountId) bson.M {
	return bson.M{
		accountIdField: aid.String(),
	}
}