import GenerateInvoice from "../../application/usecase/GenerateInvoice";
import ProcessPayment from "../../application/usecase/GenerateInvoice";
import { inject } from "../di/DI";
import Queue from "../queue/Queue";

export default class QueueController {
	@inject("queue")
	queue!: Queue;
	@inject("generateInvoice")
	generateInvoice!: GenerateInvoice;

	constructor () {
		this.queue.consume("rideCompleted.generateInvoice", async (input: any) => {
			console.log(input);
			await this.generateInvoice.execute(input);
		});
	}
}