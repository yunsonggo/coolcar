FROM golang:1.17-alpine AS builder

RUN go env -w GO111MODULE=on
RUN go env -w GOPROXY=https://goproxy.cn,direct

COPY . /go/src/coolcar/server

WORKDIR /go/src/coolcar/server

RUN go install ./gateway/...

FROM alpine:3.15

COPY --from=builder /go/bin/gateway /bin/gateway
ENV ADDR=:8080
EXPOSE 8080

ENTRYPOINT ["/bin/gateway"]

#项目目录要有go.mod文件 docker build -t 镜像名字 -f dockerfile地址 PAHT当前目录
# docker build -t coolcar/gartway -f ../deployment/gateway/Dockerfile .

#构建完成镜像以后 运行镜像
# docker run -p 8080:8080 镜像名或ID