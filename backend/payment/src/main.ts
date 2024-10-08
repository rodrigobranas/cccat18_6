import { Registry } from "./infra/di/DI";
import { PgPromiseAdapter } from "./infra/database/DatabaseConnection";
import { ExpressAdapter } from "./infra/http/HttpServer";
import AccountController from "./infra/controller/PaymentController";
import ProcessPayment from "./application/usecase/ProcessPayment";
import CieloGateway from "./infra/gateway/CieloGateway";
import PJBankGateway from "./infra/gateway/PJBankGateway";
import { PaymentProcessorFactory } from "./infra/fallback/PaymentProcessor";
import { RabbitMQAdapter } from "./infra/queue/Queue";
import QueueController from "./infra/controller/QueueController";
import { TransactionRepositoryORM } from "./infra/repository/TransactionRepository";
import ORM from "./infra/orm/ORM";

async function main () {
	const httpServer = new ExpressAdapter();
	const queue = new RabbitMQAdapter();
	await queue.connect();
	Registry.getInstance().provide("httpServer", httpServer);
	Registry.getInstance().provide("queue", queue);
	Registry.getInstance().provide("databaseConnection", new PgPromiseAdapter());
	Registry.getInstance().provide("paymentProcessor", PaymentProcessorFactory.create());
	Registry.getInstance().provide("orm", new ORM(new PgPromiseAdapter()));
	Registry.getInstance().provide("transactionRepository", new TransactionRepositoryORM());
	Registry.getInstance().provide("processPayment", new ProcessPayment());
	Registry.getInstance().provide("accountController", new AccountController());
	new QueueController();
	httpServer.listen(3002);
}

main();
