import ProcessPayment from "../../application/usecase/ProcessPayment";
import { inject } from "../di/DI";
import Queue from "../queue/Queue";

export default class QueueController {
	@inject("queue")
	queue!: Queue;
	@inject("processPayment")
	processPayment!: ProcessPayment;

	constructor () {
		this.queue.consume("rideCompleted.processPayment", async (input: any) => {
			const output = await this.processPayment.execute(input);
			console.log(output);
		});
	}
}
