import Transaction from "../src/domain/Transaction";
import UUID from "../src/domain/UUID";
import { PgPromiseAdapter } from "../src/infra/database/DatabaseConnection"
import { Registry } from "../src/infra/di/DI";
import ORM, { TransactionModel } from "../src/infra/orm/ORM";
import { TransactionRepositoryORM } from "../src/infra/repository/TransactionRepository";

test("Deve persistir uma transação com o repository", async function () {
	const connection = new PgPromiseAdapter();
	const orm = new ORM(connection);
	Registry.getInstance().provide("orm", orm);
	const transactionRepository = new TransactionRepositoryORM();
	const rideId = UUID.create();
	const transaction = Transaction.create(rideId.getValue(), 100);
	await transactionRepository.saveTransaction(transaction);
	const savedTransaction = await transactionRepository.getTransactionById(transaction.transactionId.getValue());
	console.log(savedTransaction);
	await connection.close();
});
