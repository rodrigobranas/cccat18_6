import AccountRepository from "../../infra/repository/AccountRepository";
import MailerGateway from "../../infra/gateway/MailerGateway";
import Account from "../../domain/Account";
import { inject, Registry } from "../../infra/di/DI";
import Ride from "../../domain/Ride";
import RideRepository from "../../infra/repository/RideRepository";

export default class GetRide {
	@inject("rideRepository")
	rideRepository?: RideRepository;

	async execute (rideId: string): Promise<Output> {
		const ride = await this.rideRepository?.getRideById(rideId);
		if (!ride) throw new Error("Ride not found");
		return {
			rideId: ride.getRideId(),
			passengerId: ride.getPassengerId(),
			fromLat: ride.getFrom().getLat(),
			fromLong: ride.getFrom().getLong(),
			toLat: ride.getTo().getLat(),
			toLong: ride.getTo().getLong(),
			status: ride.getStatus()
		}		
	}
}

type Output = {
	rideId: string,
	passengerId: string,
	fromLat: number,
	fromLong: number,
	toLat: number,
	toLong: number,
	status: string
}
