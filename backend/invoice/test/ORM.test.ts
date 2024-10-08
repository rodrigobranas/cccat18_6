import UUID from "../src/domain/UUID";
import { PgPromiseAdapter } from "../src/infra/database/DatabaseConnection"
import ORM, { TransactionModel } from "../src/infra/orm/ORM";

test("Deve persistir uma transação com o ORM", async function () {
	const connection = new PgPromiseAdapter();
	const orm = new ORM(connection);
	const transactionId = UUID.create();
	const rideId = UUID.create();
	const transactionModel = new TransactionModel(transactionId.getValue(), rideId.getValue(), 100, new Date(), "paid");
	await orm.save(transactionModel);
	const savedTransactionModel = await orm.get(TransactionModel, "transaction_id", transactionId.getValue());
	console.log(savedTransactionModel);
	await connection.close();
});
