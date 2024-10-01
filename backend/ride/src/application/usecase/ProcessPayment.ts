export default class ProcessPayment {

	constructor () {
	}

	async execute (input: Input): Promise<void> {
		console.log("processPayment", input);
		// chamar o Pagar.me ou o PagSeguro ou o ASAAS...
	}
}

type Input = {
	rideId: string,
	amount: number
}
