export default class GenerateInvoice {

	constructor () {
	}

	async execute (input: Input): Promise<void> {
		console.log("generateInvoice", input);
		// chamar a plataforma de emissão de nota fiscal
	}
}

type Input = {
	rideId: string,
	amount: number
}
