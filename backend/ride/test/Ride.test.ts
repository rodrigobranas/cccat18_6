import Ride from "../src/domain/entity/Ride";
import { InProgressStatus } from "../src/domain/vo/RideStatus";

test("Deve calcular a distância uma corrida", function () {
	const ride = Ride.create("", 1, 2, 3, 4);
	// ride.updatePosition(-27.584905257808835, -48.545022195325124);
	// ride.updatePosition(-27.496887588317275, -48.522234807851476);
	// ride.updatePosition(-27.584905257808835, -48.545022195325124);
	// ride.updatePosition(-27.496887588317275, -48.522234807851476);
	// expect(ride.getDistance()).toBe(30);
});
