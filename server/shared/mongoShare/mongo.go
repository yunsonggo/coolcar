package mongoShare

import (
	"2021/coolcar/server/shared/mongoShare/objid"
	"fmt"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"time"
)
const (
	IdFieldName = "_id"
	UpdatedAtFieldName = "updatedat"
)

type IdField struct {
	Id primitive.ObjectID `bson:"_id"`
}

type UpdatedAtField struct {
	UpdatedAt int64 `bson:"updatedat"`
}

var NewObjectId = primitive.NewObjectID
func NewObjectIdWithValue (id fmt.Stringer) {
	NewObjectId = func() primitive.ObjectID {
		return objid.MustFromId(id)
	}
}

var UpdatedAt = func () int64 {
	return time.Now().UnixNano()
}
// set 方法
func Set(v interface{}) bson.M {
	return bson.M{
		"$set":v,
	}
}

// setOnInsert 方法 key存在则返回已有数据 否在 创建新记录
func SetOnInsert(v interface{}) bson.M {
	return bson.M{
		"$setOnInsert":v,
	}
}

// 判断 字段 是否零值或不存在
func ZeroValueOrNotExist(field string,zero interface{}) bson.M {
	return bson.M{
		"$or":[]bson.M{
			{
				field: zero,
			},
			{
				field: bson.M{
					"$exists":false,
				},
			},
		},
	}
}