import ProcessPayment from "../../application/usecase/GenerateInvoice";
import { inject } from "../di/DI";
import HttpServer from "../http/HttpServer";

export default class PaymentController {
	@inject("httpServer")
	httpServer?: HttpServer;
	@inject("processPayment")
	processPayment!: ProcessPayment;

	constructor () {
		this.httpServer?.register("post", "/process_payment", async (params: any, body: any) => {
			const input = body;
			const output = await this.processPayment?.execute(input);
			return output;
		});
	}
}
