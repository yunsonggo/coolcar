# 扫码领枪物联网DEMO

## 项目介绍
1. 项目类型: 微信小程序(物联网)项目 不局限于某种物品
1. 项目功能: 微信扫描二维码,通过身份验证,实现人与物的绑定,实时更新位置/距离/使用记录的主要功能
1. 项目不足: 如有实施需求,请重构并完善配置文件,请完善后台管理功能,实现枪证是否合法的校验以及数据统计,日志等功能
1. 项目优势: 简单易用,微服务架构,较完善的安全防御(rsa非对称加密算法身份验证,腾讯云存储秒级有效限时保证枪证安全)

## 技术简述(接手项目必看)
1. 前端: TypeScript
1. 后端: Golang
1. 服务: GRPC
1. Http: grpc-gateway
1. 通信: websocket
1. 队列: rabbitmq
1. 数据: protobuf
1. 基础: wechat-miniprogram 
1. 数据: mongodb
1. 加密: rsa非对称加密
1. 验证: JWT
1. 容器: docker
1. 日志: zap

## 微服务调试 (项目根目录运行)
1. docker 启动 mongodb/rabbitmq
1. 前后端数据结构: ./genProto.sh
1. 身份验证服务: go run auth/main.go 
1. 上传图片服务: go run blob/main.go
1. 服务器通信: go run gateway/main.go
1. 物联网服务: go run gun/main.go
1. 行程系列服务: go run rental/main.go
1. 微信开发者工具 打开前端项目(前端根目录mimiprogram): npm install
1. 项目部署: 首先完善后端枪证合法性验证 / 或者 / 使用腾讯云图片识别文字服务完成校验枪证信息,其他视情况而定

## 项目流程
1. 打开微信小程序
1. 点击'扫码领枪'扫描二维码
1. 完善验证信息
1. 通过身份校验
1. 开启行程
1. 历史行程记录

## 权限请求
1. 使用头像
1. 使用地理位置
1. 后台运行

