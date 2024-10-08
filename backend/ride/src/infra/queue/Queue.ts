import { Connection } from "amqplib";
import amqp from "amqplib";

export default interface Queue {
	connect (): Promise<void>;
	publish (exchange: string, data: any): Promise<void>;
	consume (queue: string, callback: Function): Promise<void>;
}

export class RabbitMQAdapter implements Queue {
	connection!: Connection;

	async connect(): Promise<void> {
		this.connection = await amqp.connect("amqp://localhost");
	}

	async publish(exchange: string, data: any): Promise<void> {
		const channel = await this.connection.createChannel();
		channel.publish(exchange, "", Buffer.from(JSON.stringify(data)));
	}

	async consume(queue: string, callback: Function): Promise<void> {
		const channel = await this.connection.createChannel()
		channel.consume(queue, async function (message: any) {
			const input = JSON.parse(message.content.toString());
			await callback(input);
			channel.ack(message);
		});
	}

}
