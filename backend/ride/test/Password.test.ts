import Password, { PasswordFactory } from "../src/domain/vo/Password"

test("Deve criar uma senha válida", function () {
	const password = PasswordFactory.create("textplain", "123456");
	expect(password.getValue()).toBe("123456");
});

test("Não criar uma senha inválida", function () {
	expect(() => PasswordFactory.create("textplain", "1234")).toThrow(new Error("Invalid password"));
});
