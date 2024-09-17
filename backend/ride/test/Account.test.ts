import Account from "../src/domain/Account"

test("Deve criar uma conta", function () {
	const account = Account.create("John Doe", "john.doe@gmail.com", "97456321558", "", "123456", true, false);
	expect(account).toBeDefined();
});

test("Não deve criar uma conta com nome inválido", function () {
	expect(() => Account.create("John", "john.doe@gmail.com", "97456321558", "", "123456", true, false)).toThrow(new Error("Invalid name"));
});

test("Não deve criar uma conta com email inválido", function () {
	expect(() => Account.create("John Doe", "john.doe", "97456321558", "", "123456", true, false)).toThrow(new Error("Invalid email"));
});

test("Não deve criar uma conta com cpf inválido", function () {
	expect(() => Account.create("John Doe", "john.doe@gmail.com", "9745632155", "", "123456", true, false)).toThrow(new Error("Invalid cpf"));
});

test("Não deve criar uma conta com placa do carro inválida", function () {
	expect(() => Account.create("John Doe", "john.doe@gmail.com", "97456321558", "", "123456", true, true)).toThrow(new Error("Invalid car plate"));
});