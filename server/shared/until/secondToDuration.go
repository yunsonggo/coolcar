package until

import "time"

func SecondToDuration(sec int32) time.Duration {
	return time.Duration(sec) * time.Second
}
