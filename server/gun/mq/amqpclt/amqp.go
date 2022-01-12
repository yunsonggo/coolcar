package amqpclt

import (
	gunpb "2021/coolcar/server/gun/api/gen/v1"
	"context"
	"encoding/json"
	"fmt"
	"github.com/streadway/amqp"
	"go.uber.org/zap"
)

type Publisher struct {
	ch       *amqp.Channel
	exchange string
}

func NewPublisher(conn *amqp.Connection, exchange string) (*Publisher, error) {
	ch, err := conn.Channel()
	if err != nil {
		return nil, fmt.Errorf("cannot allocate channel: %v", err)
	}

	err = declareExchange(ch, exchange)
	if err != nil {
		return nil, fmt.Errorf("cannot declare exchange: %v", err)
	}

	return &Publisher{
		ch:       ch,
		exchange: exchange,
	}, nil
}

func (p *Publisher) Publish(c context.Context, gun *gunpb.GunEntity) error {
	b, err := json.Marshal(gun)
	if err != nil {
		return fmt.Errorf("cannot marshal: %v", err)
	}
	return p.ch.Publish(
		p.exchange,
		"",    // key
		false, // mandatory
		false, // immediate
		amqp.Publishing{
			Body: b,
		},
	)
}

// Subscriber implements an amqp subscriber.
type Subscriber struct {
	conn     *amqp.Connection
	exchange string
	logger   *zap.Logger
}

// NewSubscriber creates an amqp subscriber.
func NewSubscriber(conn *amqp.Connection, exchange string, logger *zap.Logger) (*Subscriber, error) {
	ch, err := conn.Channel()
	if err != nil {
		return nil, fmt.Errorf("cannot allocate channel: %v", err)
	}
	defer ch.Close()

	err = declareExchange(ch, exchange)
	if err != nil {
		return nil, fmt.Errorf("cannot declare exchange: %v", err)
	}

	return &Subscriber{
		conn:     conn,
		exchange: exchange,
		logger:   logger,
	}, nil
}

// SubscribeRaw subscribes and returns a channel with raw amqp delivery.
func (s *Subscriber) SubscribeRaw(ctx context.Context) (<-chan amqp.Delivery, func(), error) {
	ch, err := s.conn.Channel()
	if err != nil {
		return nil, func() {}, fmt.Errorf("cannot allocate channel: %v", err)
	}
	closeCh := func() {
		err = ch.Close()
		if err != nil {
			s.logger.Error("cannot close channel", zap.Error(err))
		}
	}
	q, err := ch.QueueDeclare(
		"",    // name
		false, // durable
		true,  // autoDelete
		false, // exlusive
		false, // noWait
		nil,   // args
	)
	if err != nil {
		return nil, closeCh, fmt.Errorf("cannot declare queue: %v", err)
	}

	cleanUp := func() {
		_, err = ch.QueueDelete(
			q.Name,
			false, // ifUnused
			false, // ifEmpty
			false, // noWait
		)
		if err != nil {
			s.logger.Error("cannot delete queue", zap.String("name", q.Name), zap.Error(err))
		}
		closeCh()
	}

	err = ch.QueueBind(
		q.Name,
		"", // key
		s.exchange,
		false, // noWait
		nil,   // args
	)
	if err != nil {
		return nil, cleanUp, fmt.Errorf("cannot bind: %v", err)
	}

	msgs, err := ch.Consume(
		q.Name,
		"",    // consumer
		true,  // autoAck
		false, // exclusive
		false, // noLocal
		false, // noWait
		nil,   // args
	)
	if err != nil {
		return nil, cleanUp, fmt.Errorf("cannot consume queue: %v", err)
	}
	return msgs, cleanUp, nil
}

// Subscribe subscribes and returns a channel with GunEntity data.
func (s *Subscriber) Subscribe(c context.Context) (chan *gunpb.GunEntity, func(), error) {
	msgCh, cleanUp, err := s.SubscribeRaw(c)
	if err != nil {
		return nil, cleanUp, err
	}

	gunCh := make(chan *gunpb.GunEntity)
	go func() {
		for msg := range msgCh {
			var gun gunpb.GunEntity
			err = json.Unmarshal(msg.Body, &gun)
			if err != nil {
				s.logger.Error("cannot unmarshal", zap.Error(err))
			}
			gunCh <- &gun
		}
		close(gunCh)
	}()
	return gunCh, cleanUp, nil
}

func declareExchange(ch *amqp.Channel, exchange string) error {
	return ch.ExchangeDeclare(
		exchange,
		"fanout",
		true,  // durable
		false, // autoDelete
		false, // internal
		false, // noWait
		nil,   // args
	)
}