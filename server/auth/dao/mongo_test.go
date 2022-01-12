package dao

import (
	"2021/coolcar/server/shared/mongoShare"
	"2021/coolcar/server/shared/testingShare"
	"context"
	"fmt"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"os"
	"testing"
)

var mongoURI string

func TestResolveAccountId(t *testing.T) {
	c := context.Background()
	mc,err := mongo.Connect(c,options.Client().ApplyURI(mongoURI))
	if err != nil {
		t.Fatal(err)
	}
	m := NewMongo(mc.Database("coolcar"),"account")
	mongoShare.NewObjectId = func() primitive.ObjectID {
		objId,_ := primitive.ObjectIDFromHex("61d70baadfce0bc8508eb177")
		return objId
	}
	accountId,err := m.ResolveAccountId(c,"123")
	if err != nil {
		t.Fatal("resolve",err)
	}
	want := "61d70baadfce0bc8508eb177"
	if accountId != want {
		t.Errorf("want:%q,got:%q\n",want,accountId)
	}
}

func TestMain(m *testing.M) {
	os.Exit(testingShare.RunOnceMongoInDocker(m,&mongoURI))
}
