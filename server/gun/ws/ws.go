package ws

import (
	"2021/coolcar/server/gun/mq/amqpclt"
	"context"
	"github.com/gorilla/websocket"
	"go.uber.org/zap"
	"net/http"
	"time"
)

func Handler(u *websocket.Upgrader,sub *amqpclt.Subscriber,logger *zap.Logger) http.HandlerFunc {
	return func (w http.ResponseWriter,r *http.Request) {
		conn,err := u.Upgrade(w,r,nil)
		if err != nil {
			logger.Error("upgrade err",zap.Error(err))
			w.WriteHeader(http.StatusInternalServerError)
			return
		}
		defer conn.Close()

		msgs,cleanUp,err := sub.Subscribe(context.Background())
		defer cleanUp()
		if err != nil {
			logger.Error("ws subscribe err",zap.Error(err))
			w.WriteHeader(http.StatusInternalServerError)
			return
		}

		done := make(chan struct{})
		go func() {
			for {
				_,_,readErr := conn.ReadMessage()
				if readErr != nil {
					if !websocket.IsCloseError(readErr,websocket.CloseGoingAway,websocket.CloseNormalClosure) {
						logger.Warn("read json err:",zap.Error(readErr))
					}
					done <- struct{}{}
					break
				}
			}
		}()

		for {
			select {
			case msg := <-msgs:
				writeErr := conn.WriteJSON(msg)
				if writeErr != nil {
					logger.Warn("write json msg err",zap.Error(writeErr))
				}
			case <-time.After(500 * time.Millisecond):
			case <- done:
				return
			}
		}
	}
}
