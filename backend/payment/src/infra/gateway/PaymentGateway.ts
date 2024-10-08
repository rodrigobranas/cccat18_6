export default interface PaymentGateway {
	createTransaction (input: Input): Promise<Output>;
}

export type Input = {
	cardHolder: string,
	creditCardNumber: string,
	expDate: string,
	cvv: string,
	amount: number
}

export type Output = {
	tid: string;
	authorizationCode: string;
	status: string
}
