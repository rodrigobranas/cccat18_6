import Transaction from "../../domain/Transaction";
import { inject } from "../di/DI";
import ORM, { TransactionModel } from "../orm/ORM";

export default interface TransactionRepository {
	saveTransaction (transaction: Transaction): Promise<void>;
	getTransactionById (transactionId: string): Promise<Transaction>;
}

export class TransactionRepositoryORM implements TransactionRepository {
	@inject("orm")
	orm!: ORM;

	async saveTransaction(transaction: Transaction): Promise<void> {
		await this.orm.save(TransactionModel.fromAggregate(transaction));
	}

	async getTransactionById(transactionId: string): Promise<Transaction> {
		const transactionModel = await this.orm.get(TransactionModel, "transaction_id", transactionId);
		return transactionModel.toAggregate();
	}
}
