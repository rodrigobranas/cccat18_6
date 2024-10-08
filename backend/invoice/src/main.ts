import { Registry } from "./infra/di/DI";
import { PgPromiseAdapter } from "./infra/database/DatabaseConnection";
import { ExpressAdapter } from "./infra/http/HttpServer";
import AccountController from "./infra/controller/PaymentController";
import ProcessPayment from "./application/usecase/GenerateInvoice";
import { RabbitMQAdapter } from "./infra/queue/Queue";
import QueueController from "./infra/controller/QueueController";
import ORM from "./infra/orm/ORM";
import GenerateInvoice from "./application/usecase/GenerateInvoice";

async function main () {
	const queue = new RabbitMQAdapter();
	await queue.connect();
	Registry.getInstance().provide("queue", queue);
	Registry.getInstance().provide("generateInvoice", new GenerateInvoice());
	new QueueController();
}

main();
