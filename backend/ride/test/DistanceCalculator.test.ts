import DistanceCalculator from "../src/domain/service/DistanceCalculator"
import Coord from "../src/domain/vo/Coord";

test("Deve calcular a distância entre duas coordenadas", function () {
	const from = new Coord(-27.584905257808835, -48.545022195325124);
	const to = new Coord(-27.496887588317275, -48.522234807851476);
	expect(DistanceCalculator.calculate(from, to)).toBe(10);
});
