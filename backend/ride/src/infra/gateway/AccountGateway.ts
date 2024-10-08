import axios from "axios";

export default class AccountGateway {
	async signup (input: any): Promise<any> {
		const response = await axios.post("http://localhost:3001/signup", input);
		return response.data;
	}

	async getAccountById (accountId: string) {
		const response = await axios.get(`http://localhost:3001/accounts/${accountId}`);
		return response.data;
	}
}
