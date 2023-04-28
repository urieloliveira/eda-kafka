import { MessageJson, Queue } from './queue.interface';
import { Consumer, Kafka, Producer } from 'kafkajs';

export class KafkaAdapter implements Queue {
  producer: Producer;
  consumer: Consumer;

  async connect(): Promise<void> {
    const kafka = new Kafka({
      clientId: 'wallet',
      brokers: ['kafka:29092'],
    });
    this.producer = kafka.producer();
    await this.producer.connect();
    this.consumer = kafka.consumer({ groupId: 'wallet' });
    await this.consumer.connect();
  }

  async on(queueName: string, callback: (input: any) => any): Promise<void> {
    await this.consumer.subscribe({ topic: queueName, fromBeginning: true });
    await this.consumer.run({
      eachMessage: async ({ message }) => {
        const input = JSON.parse(message.value.toString()) as MessageJson;
        await callback(input.Payload);
      },
    });
  }

  async publish(
    queueName: string,
    eventName: string,
    payload: any,
  ): Promise<void> {
    await this.producer.send({
      topic: queueName,
      messages: [
        {
          value: JSON.stringify({
            Name: eventName,
            Payload: payload,
          }),
        },
      ],
    });
  }
}
