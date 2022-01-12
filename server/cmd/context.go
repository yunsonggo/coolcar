package main

import (
	"context"
	"fmt"
)

func main() {
	ctx := context.Background()
	mainTask(ctx)
}

func mainTask(ctx context.Context) {
	smallTask(ctx,"task1")
	smallTask(ctx,"task2")
}

func smallTask(ctx context.Context,name string) {
	fmt.Printf("%s startd\n",name)
}
