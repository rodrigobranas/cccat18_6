import Transaction from "../../domain/Transaction";
import { inject } from "../../infra/di/DI";
import PaymentProcessor from "../../infra/fallback/PaymentProcessor";
import PaymentGateway from "../../infra/gateway/PaymentGateway";
import TransactionRepository from "../../infra/repository/TransactionRepository";

export default class ProcessPayment {
	@inject("paymentProcessor")
	paymentProcessor!: PaymentProcessor;
	@inject("transactionRepository")
	transactionRepository!: TransactionRepository;

	async execute (input: Input): Promise<void> {
		console.log("processPayment", input);
		const inputTransaction = {
			cardHolder: "Cliente Exemplo",
			creditCardNumber: "4012001037141112",
			expDate: "05/2027",
			cvv: "123",
			amount: input.amount
		};
		const transaction = Transaction.create(input.rideId, input.amount);
		try {
			const outputCreateTransaction = await this.paymentProcessor.processPayment(inputTransaction);
			if (outputCreateTransaction.status === "approved") {
				transaction.pay();
				await this.transactionRepository.saveTransaction(transaction);
			}
		} catch (e: any) {
			console.log("error", e.message);
		}
	}
}

type Input = {
	rideId: string,
	amount: number
}
