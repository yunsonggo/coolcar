package dao

import (
	"2021/coolcar/server/shared/mongoShare"
	"context"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

const openIdField = "open_id"

type Mongo struct {
	col *mongo.Collection
}

func NewMongo(db *mongo.Database,colName string) *Mongo {
	return &Mongo{
		col:db.Collection(colName),
	}
}

// 查询 或 插入 accountID
// accountId 类似于身份证ID 身份标识 这里取用mongoDB的"_id"值作为accountID
// accountId 作为微信小程序的 自定义登录态 标识是否登录过
// 身份验证 使用jwt
func (m *Mongo) ResolveAccountId(ctx context.Context,openId string) (accountId string,err error) {
	insertedId := mongoShare.NewObjectId()
	res := m.col.FindOneAndUpdate(ctx,bson.M{
		openIdField:openId,
	}, mongoShare.SetOnInsert(bson.M{
		mongoShare.IdFieldName: insertedId,
		openIdField:        openId,
	}),options.FindOneAndUpdate().SetUpsert(true).SetReturnDocument(options.After))
	if err = res.Err();err != nil {
		return
	}
	var row mongoShare.IdField
	err = res.Decode(&row)
	if err != nil {
		return
	}
	return row.Id.Hex(),nil
}
