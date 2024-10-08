import CieloGateway from "../gateway/CieloGateway";
import { Input, Output } from "../gateway/PaymentGateway";
import PJBankGateway from "../gateway/PJBankGateway";

// Chain of Responsibility
export default interface PaymentProcessor {
	next?: PaymentProcessor;
	processPayment(input: Input): Promise<Output>;
}

export class PJBankProcessor implements PaymentProcessor {

	constructor (readonly next?: PaymentProcessor) {
	}

	async processPayment(input: Input): Promise<Output> {
		try {
			const pjbankGateway = new PJBankGateway();
			const output = await pjbankGateway.createTransaction(input);
			return output;
		} catch (e: any) {
			if (!this.next) throw new Error("Out of processors");
			return this.next.processPayment(input);
		}
	}

}

export class CieloProcessor implements PaymentProcessor {

	constructor (readonly next?: PaymentProcessor) {
	}

	async processPayment(input: Input): Promise<Output> {
		try {
			const cieloGateway = new CieloGateway();
			const output = await cieloGateway.createTransaction(input);
			return output;
		} catch (e: any) {
			if (!this.next) throw new Error("Out of processors");
			return this.next.processPayment(input);
		}
	}

}

export class PaymentProcessorFactory {
	static create (): PaymentProcessor {
		const cieloProcessor = new CieloProcessor();
		const pjBankProcessor = new PJBankProcessor(cieloProcessor);
		return pjBankProcessor;
	}
}