package cos

import (
	"context"
	"errors"
	"github.com/tencentyun/cos-go-sdk-v5"
	"io"
	"net/http"
	"net/url"
	"time"
)

type TencentCosServer struct {
	client *cos.Client
	secId string
	secKey string
}

func NewTencentCosServer(bucketAddr,secId,secKey string) (*TencentCosServer,error) {
	u,err := url.Parse(bucketAddr)
	if err != nil {
		return nil,err
	}
	b := &cos.BaseURL{
		BucketURL:  u,
	}
	client := cos.NewClient(b,&http.Client{
		Transport:     &cos.AuthorizationTransport{
			SecretID:     secId,
			SecretKey:    secKey,
		},
	})
	return &TencentCosServer{
		client: client,
		secId:  secId,
		secKey: secKey,
	},nil
}

func (tcs *TencentCosServer) SignURL(ctx context.Context,method,path string,timeout time.Duration) (string,error) {
	u,err := tcs.client.Object.GetPresignedURL(ctx,method,path,tcs.secId,tcs.secKey,timeout,nil)
	if err != nil {
		return "",err
	}
	return u.String(),nil
}

func (tcs *TencentCosServer) Get(ctx context.Context,path string) (io.ReadCloser,error) {
	var b io.ReadCloser
	res,err := tcs.client.Object.Get(ctx,path,nil)
	if res != nil {
		b  = res.Body
	}
	if err != nil {
		return b,err
	}
	if res.StatusCode >= 400 {
		return b,errors.New("response err from tencent cos")
	}
	return b,nil
}