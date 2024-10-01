import Position from "./Position";
import DistanceCalculator from "../service/DistanceCalculator";
import Coord from "../vo/Coord";
import RideStatus, { RequestedStatus, RideStatusFactory } from "../vo/RideStatus";
import UUID from "../vo/UUID";
import RideCompletedEvent from "../event/RideCompletedEvent";
import Mediator from "../../infra/mediator/Mediator";
import { FareCalculatorFactory } from "../service/FareCalculator";

export default class Ride extends Mediator {
	private rideId: UUID;
	private passengerId: UUID;
	private driverId?: UUID;
	private from: Coord;
	private to: Coord;
	private status: RideStatus;
	private date: Date;

	constructor (rideId: string, passengerId: string, fromLat: number, fromLong: number, toLat: number, toLong: number, status: string, date: Date, driverId: string = "", private distance: number = 0, private fare: number = 0) {
		super();
		this.rideId = new UUID(rideId);
		this.passengerId = new UUID(passengerId);
		if (driverId) this.driverId = new UUID(driverId);
		this.from = new Coord(fromLat, fromLong);
		this.to = new Coord(toLat, toLong);
		this.status = RideStatusFactory.create(status, this);
		this.date = date;
	}

	static create (passengerId: string, fromLat: number, fromLong: number, toLat: number, toLong: number) {
		const uuid = UUID.create();
		const status = "requested";
		const date = new Date();
		const driverId = "";
		const distance = 0;
		const fare = 0;
		return new Ride(uuid.getValue(), passengerId, fromLat, fromLong, toLat, toLong, status, date, driverId, distance, fare);
	}

	getRideId () {
		return this.rideId.getValue();
	}

	getPassengerId () {
		return this.passengerId.getValue();
	}

	getDriverId () {
		return this.driverId?.getValue();
	}

	getFrom () {
		return this.from;
	}

	getTo () {
		return this.to;
	}

	getStatus () {
		return this.status.value;
	}

	setStatus (status: RideStatus) {
		this.status = status;
	}

	accept (driverId: string) {
		this.status.accept();
		this.driverId = new UUID(driverId);
	}

	start () {
		this.status.start();
	}

	finish (positions: Position[]) {
		this.distance = 0;
		this.fare = 0;
		for (const [index, position] of positions.entries()) {
			const nextPosition = positions[index + 1];
			if (!nextPosition) continue;
			const distance = DistanceCalculator.calculate(position.coord, nextPosition.coord);
			this.distance += distance;
			this.fare += FareCalculatorFactory.create(position.date).calculate(distance);
		}
		this.status.finish();
		const event = new RideCompletedEvent(this.getRideId(), this.fare);
		this.notify(RideCompletedEvent.eventName, event);
	}

	getDate () {
		return this.date;
	}

	getDistance () {
		return this.distance;
	}

	getFare () {
		return this.fare;
	}

}
