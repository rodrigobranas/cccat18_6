export default class GenerateInvoice {

	async execute (input: Input): Promise<void> {
		console.log("generateInvoice", input);
	}
}

type Input = {
	rideId: string,
	amount: number
}
