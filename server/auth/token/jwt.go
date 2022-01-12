package token

import (
	"crypto/rsa"
	"github.com/dgrijalva/jwt-go"
	"time"
)

type JWTGen struct {
	issuer string
	nowTimeFunc func () time.Time
	privateKey *rsa.PrivateKey
}

func NewJWTGen(issuer string,privateKey *rsa.PrivateKey) *JWTGen {
	return &JWTGen{
		issuer:      issuer,
		nowTimeFunc: time.Now,
		privateKey: privateKey,
	}
}

func (jg *JWTGen) GenerateToken(accountId string,expire time.Duration) (token string,err error) {
	nowSec := jg.nowTimeFunc().Unix()
	tkn := jwt.NewWithClaims(jwt.SigningMethodRS512,jwt.StandardClaims{
		ExpiresAt: nowSec + int64(expire.Seconds()),
		IssuedAt:  nowSec,
		Issuer:    jg.issuer,
		Subject:   accountId,
	})
	token,err = tkn.SignedString(jg.privateKey)
	return
}