package main

import (
	"fmt"
	"github.com/streadway/amqp"
	"time"
)

func main() {
	var addr = "amqp://guest:guest@localhost:5672/"
	conn,err := amqp.Dial(addr)
	if err != nil {
		panic(err)
	}
	channel,err := conn.Channel()
	if err != nil {
		panic(err)
	}
	defer channel.Close()

	err = channel.ExchangeDeclare(
		"ex_go",
		"fanout",
		true,
		false,
		false,
		false,
		nil,
		)

	//q,err := channel.QueueDeclare(
	//	"test_go1",
	//	true,
	//	false,
	//	false,
	//	false,
	//	nil,
	//	)
	if err != nil {
		panic(err)
	}
	//go consumer(conn,q.Name,"c1")
	//go consumer(conn,q.Name,"c2")
	go subscribe(conn,"ex_go")
	go subscribe(conn,"ex_go")
	go subscribe(conn,"ex_go")

	i := 0
	for {
		i++
		err = channel.Publish(
			"ex_go", // 选择交换机
			//q.Name, // 队列名称
			"",
			false, //
			false,  //是否阻塞
			amqp.Publishing{
				Body:[]byte(fmt.Sprintf("test send msg %d",i)),
			},//
			)
		if err != nil {
			fmt.Println(err)
		}
		time.Sleep(time.Second)
		if i >= 100 {
			break
		}
	}

}

func consumer(conn *amqp.Connection,queueName string,cName string) {
	ch,err := conn.Channel()
	if err != nil {
		panic(err)
	}
	defer ch.Close()
	msgs,err := ch.Consume(
		queueName,
		cName,
		true,
		false,
		false,
		false,
		nil,
		)
	if err != nil {
		panic(err)
	}
	for msg := range msgs {
		fmt.Printf("%s:%s\n",cName,msg.Body)
	}
}

func subscribe(conn *amqp.Connection,exchange string) {
	ch,err := conn.Channel()
	if err != nil {
		panic(err)
	}
	defer ch.Close()
	q,err := ch.QueueDeclare(
	"",
	false,
	true,
	false,
	false,
	nil,
		)
	if err != nil {
		panic(err)
	}
	defer ch.QueueDelete(
		q.Name,
		false,
		false,
		false,
		)
	_ = ch.QueueBind(
		q.Name,
		"",
		"ex_go",
		false,
		nil,
		)
	exchangeConsumer(ch,"c",q.Name)

}

func exchangeConsumer(ch *amqp.Channel,c,q string) {
	msgs,err := ch.Consume(
		q,
		c,
		true,
		false,
		false,
		false,
		nil,
	)
	if err != nil {
		panic(err)
	}
	for msg := range msgs {
		fmt.Printf("%s:%s\n",c,msg.Body)
	}
}