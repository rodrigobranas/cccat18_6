import Account from "../../domain/entity/Account";
import { inject, Registry } from "../../infra/di/DI";
import Ride from "../../domain/entity/Ride";
import RideRepository from "../../infra/repository/RideRepository";
import PositionRepository from "../../infra/repository/PositionRepository";
import DistanceCalculator from "../../domain/service/DistanceCalculator";

export default class GetRide {
	@inject("rideRepository")
	rideRepository?: RideRepository;
	@inject("positionRepository")
	positionRepository?: PositionRepository;

	async execute (rideId: string): Promise<Output> {
		const ride = await this.rideRepository?.getRideById(rideId);
		if (!ride) throw new Error("Ride not found");
		const positions = await this.positionRepository?.getPositionsByRideId(rideId);
		const distance = (ride.getStatus() === "completed") ? ride.getDistance() : DistanceCalculator.calculateByPositions(positions || []);
		return {
			rideId: ride.getRideId(),
			passengerId: ride.getPassengerId(),
			fromLat: ride.getFrom().getLat(),
			fromLong: ride.getFrom().getLong(),
			toLat: ride.getTo().getLat(),
			toLong: ride.getTo().getLong(),
			status: ride.getStatus(),
			driverId: ride.getDriverId(),
			positions: positions || [],
			distance,
			fare: ride.getFare()
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
	status: string,
	driverId?: string,
	positions: any[],
	distance: number,
	fare: number
}
