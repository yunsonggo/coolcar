package middleware

import (
	"2021/coolcar/server/shared/tokenShare"
	"context"
	"github.com/dgrijalva/jwt-go"
	"google.golang.org/grpc"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/metadata"
	"google.golang.org/grpc/status"
	"io/ioutil"
	"os"
	"strings"
)

const (
	ImpersonateAccountHeader = "impersonate-account-id"
	tokenHeader = "authorization"
	tokenPrefix = "Bearer "
)

// 返回 grpc auth 中间件
func Interceptor (publicKeyPath string) (grpc.UnaryServerInterceptor,error) {
	f,err := os.Open(publicKeyPath)
	if err != nil {
		return nil,err
	}
	defer f.Close()
	b,err := ioutil.ReadAll(f)
	if err != nil {
		return nil,err
	}
	pubKey,err := jwt.ParseRSAPublicKeyFromPEM(b)
	if err != nil {
		return nil,err
	}
	i := interceptor{
		verifier: &tokenShare.JWTVerifier{
			PublicKey: pubKey,
		},
	}
	return i.TokenAuthMiddleware,nil
}

// 自定义 grpc 中间件 基础结构
type interceptor struct {
	verifier tokenVerifier
}

type tokenVerifier interface {
	Verify(token string) (string,error)
}

// 解析token 中间件
func (i *interceptor) TokenAuthMiddleware(ctx context.Context,req interface{},info *grpc.UnaryServerInfo,handler grpc.UnaryHandler) (resp interface{},err error) {
	aid := impersonationFromContext(ctx)
	if aid != "" {
		return handler(ContextWithAccountId(ctx,aid),req)
	}
	token,err := tokenFromCtx(ctx)
	if err != nil {
		return nil,status.Error(codes.Unauthenticated,"")
	}
	accountId,err := i.verifier.Verify(token)
	if err != nil {
		return nil,status.Error(codes.Unauthenticated,"token err")
	}
	return handler(ContextWithAccountId(ctx,accountId),req)
}

func impersonationFromContext(c context.Context) string {
	m, ok := metadata.FromIncomingContext(c)
	if !ok {
		return ""
	}
	imp := m[ImpersonateAccountHeader]
	if len(imp) == 0 {
		return ""
	}
	return imp[0]
}

func tokenFromCtx(ctx context.Context) (string,error) {
	md,ok := metadata.FromIncomingContext(ctx)
	if !ok {
		return "",status.Error(codes.Unauthenticated,"")
	}
	tkn := ""
	for _,v := range md[tokenHeader] {
		if strings.HasPrefix(v,tokenPrefix) {
			tkn = v[len(tokenPrefix):]
		}
	}
	if tkn == "" {
		return "",status.Error(codes.Unauthenticated,"")
	}
	return tkn,nil
}

type accountIdKey struct {}

// 返回ctx
func ContextWithAccountId(ctx context.Context,accountId string) context.Context {
	return context.WithValue(ctx,accountIdKey{},accountId)
}

// 获取accountId
func AccountIdFromContext(ctx context.Context) (string,error) {
	v := ctx.Value(accountIdKey{})
	aid,ok := v.(string)
	if !ok {
		return "",status.Error(codes.Unauthenticated,"")
	}
	return aid,nil
}