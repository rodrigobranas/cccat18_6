import Password from "../src/domain/vo/Password"

test("Deve criar uma senha válida", function () {
	const password = new Password("123456");
	expect(password.getValue()).toBe("123456");
});

test("Não criar uma senha inválida", function () {
	expect(() => new Password("1234")).toThrow(new Error("Invalid password"));
});
