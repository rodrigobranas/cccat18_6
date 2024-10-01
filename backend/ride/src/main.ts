import Signup from "./application/usecase/Signup";
import { AccountRepositoryDatabase } from "./infra/repository/AccountRepository";
import GetAccount from "./application/usecase/GetAccount";
import { MailerGatewayMemory } from "./infra/gateway/MailerGateway";
import { Registry } from "./infra/di/DI";
import { PgPromiseAdapter } from "./infra/database/DatabaseConnection";
import { ExpressAdapter } from "./infra/http/HttpServer";
import AccountController from "./infra/controller/AccountController";
import Mediator from "./infra/mediator/Mediator";
import ProcessPayment from "./application/usecase/ProcessPayment";
import GenerateInvoice from "./application/usecase/GenerateInvoice";

const httpServer = new ExpressAdapter();
const processPayment = new ProcessPayment();
const generateInvoice = new GenerateInvoice();
const mediator = new Mediator();
mediator.register("rideCompleted", async function (event: any) {
	await processPayment.execute(event);
	await generateInvoice.execute(event);
});
Registry.getInstance().provide("mediator", mediator);
Registry.getInstance().provide("httpServer", httpServer);
Registry.getInstance().provide("databaseConnection", new PgPromiseAdapter());
Registry.getInstance().provide("accountRepository", new AccountRepositoryDatabase());
Registry.getInstance().provide("mailerGateway", new MailerGatewayMemory());
Registry.getInstance().provide("signup", new Signup());
Registry.getInstance().provide("getAccount", new GetAccount());
Registry.getInstance().provide("accountController", new AccountController());
httpServer.listen(3000);