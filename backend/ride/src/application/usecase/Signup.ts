import AccountRepository from "../../infra/repository/AccountRepository";
import MailerGateway from "../../infra/gateway/MailerGateway";
import Account from "../../domain/entity/Account";
import { inject, Registry } from "../../infra/di/DI";

// Use Case
export default class Signup {
	@inject("accountRepository")
	accountRepository?: AccountRepository;
	@inject("mailerGateway")
	mailerGateway?: MailerGateway;

	async execute (input: any) {
		// orquestrar entitidades
		const account = Account.create(input.name, input.email, input.cpf, input.carPlate, input.password, input.isPassenger, input.isDriver);
		// orquestrando recursos
		const accountData = await this.accountRepository?.getAccountByEmail(input.email);
		if (accountData) throw new Error("Duplicated account");
		await this.accountRepository?.saveAccount(account);
		await this.mailerGateway?.send(account.getEmail(), "Welcome!", "...");
		return {
			accountId: account.getAccountId()
		};
	}
}
