import Position from "../../domain/entity/Position";
import RideCompletedEvent from "../../domain/event/RideCompletedEvent";
import { inject } from "../../infra/di/DI";
import PaymentGateway from "../../infra/gateway/PaymentGateway";
import Mediator from "../../infra/mediator/Mediator";
import Queue from "../../infra/queue/Queue";
import PositionRepository from "../../infra/repository/PositionRepository";
import RideRepository from "../../infra/repository/RideRepository";

export default class FinishRide {
	@inject("rideRepository")
	rideRepository!: RideRepository;
	@inject("positionRepository")
	positionRepository!: PositionRepository;
	@inject("queue")
	queue!: Queue;

	async execute (input: Input): Promise<void> {
		const ride = await this.rideRepository.getRideById(input.rideId);
		if (!ride) throw new Error();
		ride.register(RideCompletedEvent.eventName, async (event: RideCompletedEvent) => {
			await this.rideRepository.updateRide(ride);
			await this.queue.publish("rideCompleted", event);
		});
		const positions = await this.positionRepository.getPositionsByRideId(input.rideId);
		ride.finish(positions);
	}
}

type Input = {
	rideId: string
}
