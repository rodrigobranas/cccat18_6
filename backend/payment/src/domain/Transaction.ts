import UUID from "./UUID";

export default class Transaction {
	transactionId: UUID;
	rideId: UUID;

	constructor (transactionId: string, rideId: string, readonly amount: number, readonly date: Date, private status: string) {
		this.transactionId = new UUID(transactionId);
		this.rideId = new UUID(rideId);
	}

	static create (rideId: string, amount: number) {
		const transactionId = UUID.create();
		const date = new Date();
		const status = "waiting_payment";
		return new Transaction(transactionId.getValue(), rideId, amount, date, status);
	}

	pay () {
		this.status = "paid";
	}

	getStatus () {
		return this.status;
	}
}
