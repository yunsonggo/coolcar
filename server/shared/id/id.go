package id

type AccountId string
func (a AccountId) String() string {
	return string(a)
}

type TripId string
func (t TripId) String() string {
	return string(t)
}
// 验证身份 快照 ID
type IdentityId string
func (i IdentityId) String() string {
	return string(i)
}

type GunId string
func (g GunId) String() string {
	return string(g)
}

type BlobId string
func (b BlobId) String() string {
	return string(b)
}