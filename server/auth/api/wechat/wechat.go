package wechat

import (
	"fmt"
	"github.com/medivhzhan/weapp/v2"
)

//var appId = "wx114bd51c36a971c7"
//var secret = "b1585e934ea63e0355ffccd67fb66b74"

type Service struct {
	AppId string
	Secret string
}

// go get -u github.com/medivhzhan/weapp/v3 三方请求微信客户端
func (ws *Service) Recolver(code string) (openId string,err error) {
	res,resErr := weapp.Login(ws.AppId,ws.Secret,code)
	if resErr != nil {
		return "",fmt.Errorf("登录微信失败:%v\n",resErr)
	}
	if err = res.GetResponseError();err != nil {
		return "",fmt.Errorf("登录微信失败:%v\n",resErr)
	}
	return res.OpenID,nil
}
