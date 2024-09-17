import { inject } from "../di/DI";
import GetAccount from "../../application/usecase/GetAccount";
import HttpServer from "../http/HttpServer";
import Signup from "../../application/usecase/Signup";

export default class AccountController {
	@inject("httpServer")
	httpServer?: HttpServer;
	@inject("signup")
	signup?: Signup;
	@inject("getAccount")
	getAccount?: GetAccount;

	constructor () {
		this.httpServer?.register("post", "/signup", async (params: any, body: any) => {
			const input = body;
			const output = await this.signup?.execute(input);
			return output;
		});
		
		this.httpServer?.register("get", "/accounts/:accountId", async (params: any, body: any) => {
			const output = await this.getAccount?.execute(params.accountId);
			return output;
		});
	}
}
