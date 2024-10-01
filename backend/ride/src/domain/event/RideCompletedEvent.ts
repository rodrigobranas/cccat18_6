export default class RideCompletedEvent {
	static eventName = "rideCompleted";

	constructor (readonly rideId: string, readonly amount: number) {
	}
}
