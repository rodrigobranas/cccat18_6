import AccountRepository from "../../infra/repository/AccountRepository";
import MailerGateway from "../../infra/gateway/MailerGateway";
import Account from "../../domain/entity/Account";
import { inject, Registry } from "../../infra/di/DI";
import Ride from "../../domain/entity/Ride";
import RideRepository from "../../infra/repository/RideRepository";
import PositionRepository from "../../infra/repository/PositionRepository";
import DatabaseConnection from "../../infra/database/DatabaseConnection";

export default class GetRide2 {
	@inject("databaseConnection")
	connection?: DatabaseConnection;

	async execute (rideId: string): Promise<Output> {
		const ride = await this.connection?.query("select ride_id, passenger_id, driver_id, status, a.name as passenger_name from ccca.ride r join ccca.account a on (r.passenger_id = a.account_id) where ride_id = $1", [rideId]);
		return {
			rideId: ride.ride_id,
			passengerId: ride.passenger_id,
			status: ride.status,
			driverId: ride.driver_id,
			passengerName: ride.passenger_name
		}
	}
}

type Output = {
	rideId: string,
	passengerId: string,
	passengerName: string,
	status: string,
	driverId?: string,
}
