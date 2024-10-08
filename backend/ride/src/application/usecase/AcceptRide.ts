import { inject } from "../../infra/di/DI";
import Ride from "../../domain/entity/Ride";
import RideRepository from "../../infra/repository/RideRepository";
import AccountGateway from "../../infra/gateway/AccountGateway";


export default class AcceptRide {
	@inject("accountGateway")
	accountGateway?: AccountGateway;
	@inject("rideRepository")
	rideRepository?: RideRepository;

	async execute (input: Input): Promise<void> {
		const account = await this.accountGateway?.getAccountById(input.driverId);
		if (!account) throw new Error("Account does not exist");
		if (!account.isDriver) throw new Error("Account must be from a driver");
		const ride = await this.rideRepository?.getRideById(input.rideId);
		if (!ride) throw new Error();
		ride.accept(input.driverId);
		await this.rideRepository?.updateRide(ride);
	}
}

type Input = {
	rideId: string,
	driverId: string
}
