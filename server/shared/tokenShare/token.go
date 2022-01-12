package tokenShare

import (
	"crypto/rsa"
	"errors"
	"github.com/dgrijalva/jwt-go"
)

type JWTVerifier struct {
	PublicKey *rsa.PublicKey
}

// 验证token 解析 返回 accountId
func (jv *JWTVerifier) Verify(token string) (string,error) {
	tkn,err := jwt.ParseWithClaims(token,&jwt.StandardClaims{},func(token2 *jwt.Token) (interface{},error) {
		return jv.PublicKey,nil
	})
	if err != nil {
		return "",err
	}
	if !tkn.Valid {
		err = errors.New("验证token失败")
		return "",err
	}
	c,ok := tkn.Claims.(*jwt.StandardClaims)
	if !ok {
		err = errors.New("验证token失败")
		return "",err
	}
	err = c.Valid()
	if err != nil {
		return "",err
	}
	return c.Subject,nil
}
