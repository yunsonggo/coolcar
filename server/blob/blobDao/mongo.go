package blobDao

import (
	"2021/coolcar/server/shared/id"
	"2021/coolcar/server/shared/mongoShare"
	"2021/coolcar/server/shared/mongoShare/objid"
	"context"
	"fmt"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type Mongo struct {
	col *mongo.Collection
}

func NewMongo(db *mongo.Database,colName string) *Mongo {
	return &Mongo{
		col:db.Collection(colName),
	}
}

type BlobRecord struct {
	mongoShare.IdField `bson:"inline"`
	AccountId string `bson:"accountid"`
	Path string `bson:"path"`
}

func (m *Mongo) CreateBlob(ctx context.Context, aid id.AccountId) (*BlobRecord,error) {
	br := &BlobRecord{
		AccountId: aid.String(),
	}
	objId := mongoShare.NewObjectId()
	br.Id = objId
	br.Path  = fmt.Sprintf("%s/%s",aid.String(),objId.Hex())
	_,err := m.col.InsertOne(ctx,br)
	if err != nil {
		return nil,err
	}
	return br,nil
}

func (m *Mongo) GetBlob(ctx context.Context,bid id.BlobId) (*BlobRecord,error) {
	objId,err := objid.FromId(bid)
	if err != nil {
		return nil,err
	}
	res := m.col.FindOne(ctx,bson.M{
		mongoShare.IdFieldName: objId,
	})
	if err = res.Err();err!= nil {
		return nil,err
	}
	var br BlobRecord
	err = res.Decode(&br)
	if err != nil {
		return nil,err
	}
	return &br,nil
}