import { Connection } from "amqplib";
import amqp from "amqplib";

export default interface Queue {
	connect (): Promise<void>;
	disconnect (): Promise<void>;
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
		await channel.assertExchange("rideCompleted", "direct", { durable: true });
		await channel.assertQueue("rideCompleted.processPayment", { durable: true });
		await channel.assertQueue("rideCompleted.generateInvoice", { durable: true });
		await channel.assertQueue("rideCompleted.sendReceipt", { durable: true });
		await channel.bindQueue("rideCompleted.processPayment", "rideCompleted", "");
		await channel.bindQueue("rideCompleted.generateInvoice", "rideCompleted", "");
		await channel.bindQueue("rideCompleted.sendReceipt", "rideCompleted", "");
		channel.publish(exchange, "", Buffer.from(JSON.stringify(data)));
	}

	async consume(queue: string, callback: Function): Promise<void> {
		const channel = await this.connection.createChannel()
		await channel.assertExchange("rideCompleted", "direct", { durable: true });
		await channel.assertQueue("rideCompleted.processPayment", { durable: true });
		await channel.assertQueue("rideCompleted.generateInvoice", { durable: true });
		await channel.assertQueue("rideCompleted.sendReceipt", { durable: true });
		await channel.bindQueue("rideCompleted.processPayment", "rideCompleted", "");
		await channel.bindQueue("rideCompleted.generateInvoice", "rideCompleted", "");
		await channel.bindQueue("rideCompleted.sendReceipt", "rideCompleted", "");
		channel.consume(queue, async function (message: any) {
			const input = JSON.parse(message.content.toString());
			await callback(input);
			channel.ack(message);
		});
	}

	async disconnect(): Promise<void> {
		return this.connection.close();
	}

}
