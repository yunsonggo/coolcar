package blobService

import (
	blobpb "2021/coolcar/server/blob/api/gen/v1"
	"2021/coolcar/server/blob/blobDao"
	"2021/coolcar/server/shared/id"
	"2021/coolcar/server/shared/until"
	"context"
	"go.mongodb.org/mongo-driver/mongo"
	"go.uber.org/zap"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"io"
	"io/ioutil"
	"net/http"
	"time"
)


type Storage interface {
	// (云存储 腾讯云 七牛云...) 获取URL签名  cos localhost 本地
	SignURL(ctx context.Context,method,path string,timeout time.Duration) (string,error)
	Get(ctx context.Context,path string) (io.ReadCloser,error)
}

type BlobServer struct {
	Mongo *blobDao.Mongo
	Logger *zap.Logger
	Storage Storage
}


func (bs *BlobServer) CreateBlob(ctx context.Context,req *blobpb.CreateBlobRequest) (res *blobpb.CreateBlobResponse, err error) {
	aid := id.AccountId(req.AccountId)
	br,err := bs.Mongo.CreateBlob(ctx,aid)
	if err != nil {
		bs.Logger.Error("创建blob失败",zap.Error(err))
		return nil,status.Error(codes.Internal,"")
	}

	url,err := bs.Storage.SignURL(ctx,http.MethodPut,br.Path, until.SecondToDuration(req.UploadUrlTimeout))
	if err != nil {
		return nil,err
	}
	return &blobpb.CreateBlobResponse{
		Id:        br.Id.Hex(),
		UploadUrl: url,
	},nil
}
func (bs *BlobServer) GetBlob(ctx context.Context,req *blobpb.GetBlobRequest) (res *blobpb.GetBlobResponse,err error) {
	br,err := bs.GetBlobRecord(ctx,id.BlobId(req.Id))
	if err != nil {
		return nil,err
	}

	rc,err := bs.Storage.Get(ctx,br.Path)
	if rc != nil {
		defer rc.Close()
	}
	if err != nil {
		return nil,status.Error(codes.Aborted,err.Error())
	}

	b,err := ioutil.ReadAll(rc)
	if err != nil {
		return nil,status.Error(codes.Aborted,err.Error())
	}
	return &blobpb.GetBlobResponse{
		Data:     b,
		MimeType: "image/jpeg",
	},nil
}
func (bs *BlobServer) GetBlobURL(ctx context.Context,req *blobpb.GetBlobURLRequest) (res *blobpb.GetBlobURLResponse,err error) {
	br,err := bs.GetBlobRecord(ctx,id.BlobId(req.Id))
	if err != nil {
		return nil,err
	}
	u,err := bs.Storage.SignURL(ctx,http.MethodGet,br.Path,until.SecondToDuration(req.UploadUrlTimeout))
	if err != nil {
		return nil,status.Error(codes.Aborted,err.Error())
	}
	return &blobpb.GetBlobURLResponse{Url: u},nil
}

func (bs *BlobServer) GetBlobRecord(ctx context.Context,bid id.BlobId) (res *blobDao.BlobRecord,err error) {
	br,err := bs.Mongo.GetBlob(ctx,bid)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			return nil,status.Error(codes.NotFound,"")
		}
		return nil,status.Error(codes.InvalidArgument,err.Error())
	}
	return br,nil
}