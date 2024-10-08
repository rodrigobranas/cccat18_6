import AccountRepository from "../../infra/repository/AccountRepository";
import { inject } from "../../infra/di/DI";

export default class GetAccount {
	@inject("accountRepository")
	accountRepository?: AccountRepository;

	async execute (accountId: string) {
		const account = await this.accountRepository?.getAccountById(accountId);
		if (!account) throw new Error("Account not found");
		// DTO - Data Transfer Object
		return {
			accountId: account.getAccountId(),
			name: account.getName(),
			email: account.getEmail(),
			cpf: account.getCpf(),
			carPlate: account.getCarPlate(),
			password: account.getPassword(),
			isPassenger: account.isPassenger,
			isDriver: account.isDriver
		};
	}
}
