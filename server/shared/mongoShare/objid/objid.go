package objid

import (
	"2021/coolcar/server/shared/id"
	"fmt"
	"go.mongodb.org/mongo-driver/bson/primitive"
)
// string id 转 mongodb 的objectId
func FromId(id fmt.Stringer) (primitive.ObjectID,error) {
	return primitive.ObjectIDFromHex(id.String())
}
// objectId 转 accountId string
func ToAccountId(objId primitive.ObjectID) id.AccountId {
	return id.AccountId(objId.Hex())
}
// objectId 转 tripId string
func ToTripId(objId primitive.ObjectID) id.TripId {
	return id.TripId(objId.Hex())
}

func MustFromId(id fmt.Stringer) primitive.ObjectID {
	objId,err := FromId(id)
	if err != nil {
		panic(err)
	}
	return objId
}