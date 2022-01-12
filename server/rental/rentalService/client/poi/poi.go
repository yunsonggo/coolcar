package poi

import (
	rentalpb "2021/coolcar/server/rental/api/gen/v1"
	"context"
)

// 用户定位地标
type Manager struct {}

//var poiList = []string {}
// 随机性 且固定的从poiList中取出一个
func (m *Manager) Resolve(ctx context.Context,location *rentalpb.Location) (string,error) {
	return "",nil
	// 转二进制
	//b,err := proto.Marshal(location)
	//if err != nil {
	//	return "",err
	//}
	//// 计算哈希值
	//h := fnv.New32()
	//_,err = h.Write(b)
	//if err != nil {
	//	return "",err
	//}
	//return poiList[int(h.Sum32()) % len(poiList)],nil
}