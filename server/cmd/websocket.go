package main

import (
	"fmt"
	"github.com/gorilla/websocket"
	"log"
	"net/http"
	"strconv"
	"time"
)

func main() {
	http.HandleFunc("/ws",handleWebSocket)
	fmt.Println("cmd ws server run:9090,handle:/ws")
	log.Fatal(http.ListenAndServe(":9090",nil))
}

func handleWebSocket(w http.ResponseWriter,r *http.Request) {
	//io.WriteString(w, "Hello, world!\n")
	//fmt.Fprintf(w,"Hello,world")
	u := &websocket.Upgrader{
		CheckOrigin: func(r *http.Request) bool {
			return true
		},
	}
	conn,err := u.Upgrade(w,r,nil)
	if err != nil {
		fmt.Printf("upgrade err:%v\n",err)
		return
	}
	defer conn.Close()
	done := make(chan struct{})
	go func() {
		for {
			m := make(map[string]int)
			readErr := conn.ReadJSON(&m)
			if readErr != nil {
				if !websocket.IsCloseError(readErr,websocket.CloseGoingAway,websocket.CloseNormalClosure) {
					fmt.Printf("read json err:%v\n",readErr)
				}
				done <- struct{}{}
				break
			}
			if m != nil {
				fmt.Printf("read : %v\n",m)
			} else {
				time.Sleep(500 * time.Millisecond)
			}
		}
	}()
	i := 0
	for {
		select {
		case <-time.After(500 * time.Millisecond):
		case <- done:
			return
		}
		i ++
		err = conn.WriteJSON(map[string]string{
			"hello":"websocket",
			"msg_id": strconv.Itoa(i),
		})
		if err != nil {
			fmt.Printf("write json err:%v\n",err)
		}
	}
}
