import { MessageJson, Queue } from './queue.interface';
import amqp from 'amqplib';

export class RabbitMQAdapter implements Queue {
  connection: amqp.Connection;

  async connect(): Promise<void> {
    this.connection = await amqp.connect({
      hostname: 'rabbitmq',
      port: 5672,
      username: 'rabbitmq',
      password: 'rabbitmq',
    });
  }

  async on(queueName: string, callback: (input: any) => any): Promise<void> {
    const channel = await this.connection.createChannel();
    await channel.assertQueue(queueName, { durable: true });
    channel.consume(queueName, async function (msg: any) {
      const input = JSON.parse(msg.content.toString()) as MessageJson;
      await callback(input.Payload);
      channel.ack(msg);
    });
  }

  async publish(
    queueName: string,
    eventName: string,
    payload: any,
  ): Promise<void> {
    const message = JSON.stringify({
      Name: eventName,
      Payload: payload,
    });
    const channel = await this.connection.createChannel();
    await channel.assertQueue(queueName, { durable: true });
    channel.sendToQueue(queueName, Buffer.from(message));
  }
}
