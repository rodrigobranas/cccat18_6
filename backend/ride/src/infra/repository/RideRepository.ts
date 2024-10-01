import DatabaseConnection from "../database/DatabaseConnection";
import { inject } from "../di/DI";
import Ride from "../../domain/entity/Ride";
import Logger from "../logger/Logger";

export default interface RideRepository {
	saveRide (ride: Ride): Promise<void>;
	getRideById (rideId: string): Promise<Ride>;
	updateRide (ride: Ride): Promise<void>;
	hasActiveRideByPassengerId (passengerId: string): Promise<boolean>;
}

export class RideRepositoryDatabase implements RideRepository {
	@inject("databaseConnection")
	connection?: DatabaseConnection;

	async saveRide(ride: Ride): Promise<void> {
		Logger.getInstance().debug("saveRide", ride);
		await this.connection?.query("insert into ccca.ride (ride_id, passenger_id, from_lat, from_long, to_lat, to_long, status, date, distance, fare) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)", [ride.getRideId(), ride.getPassengerId(), ride.getFrom().getLat(), ride.getFrom().getLong(), ride.getTo().getLat(), ride.getTo().getLong(), ride.getStatus(), ride.getDate(), ride.getDistance(), ride.getFare()]);
	}

	async getRideById(rideId: string): Promise<Ride> {
		const [rideData] = await this.connection?.query("select * from ccca.ride where ride_id = $1", [rideId]);
		if (!rideData) throw new Error("Ride not found");
		const ride = new Ride(rideData.ride_id, rideData.passenger_id, parseFloat(rideData.from_lat), parseFloat(rideData.from_long), parseFloat(rideData.to_lat), parseFloat(rideData.to_long), rideData.status, rideData.date, rideData.driver_id, parseFloat(rideData.distance), parseFloat(rideData.fare));
		Logger.getInstance().debug("getRideById", ride);
		return ride;
	}

	async updateRide(ride: Ride): Promise<void> {
		Logger.getInstance().debug("updateRide", ride);
		await this.connection?.query("update ccca.ride set status = $1, driver_id = $2, distance = $3, fare = $4 where ride_id = $5", [ride.getStatus(), ride.getDriverId(), ride.getDistance(), ride.getFare(), ride.getRideId()]);
	}

	async hasActiveRideByPassengerId(passengerId: string): Promise<boolean> {
		const [rideData] = await this.connection?.query("select * from ccca.ride where passenger_id = $1 and status not in ('completed', 'cancelled')", [passengerId]);
		if (!rideData) return false;
		return true;
	}

}
