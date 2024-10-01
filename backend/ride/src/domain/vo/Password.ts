import crypto from "crypto";

export default abstract class Password {
	protected value!: string;
	abstract type: string;

	constructor (value: string, operation: string) {
		if (value.length < 6) throw new Error("Invalid password");
		if (operation === "create") this.value = this.encrypt(value);
		if (operation === "restore") this.value = value;
	}

	getValue () {
		return this.value;
	}

	abstract encrypt (value: string): string;
	abstract isValid (value: string): boolean;
}

export class TextPlainPassword extends Password {
	type = "textplain";

	encrypt(value: string): string {
		return value;
	}

	isValid(value: string): boolean {
		return this.value === value;
	}

}

export class MD5Password extends Password {
	type = "md5";

	encrypt(value: string): string {
		return crypto.createHash("md5").update(value).digest("hex");

	}

	isValid(value: string): boolean {
		return this.value === crypto.createHash("md5").update(value).digest("hex");
	}

}

export class SHA1Password extends Password {
	type = "sha1";

	encrypt(value: string): string {
		return crypto.createHash("sha1").update(value).digest("hex");

	}

	isValid(value: string): boolean {
		return this.value === crypto.createHash("sha1").update(value).digest("hex");
	}

}

export class PasswordFactory {
	static build (type: string, password: string, operation: string) {
		if (type === "textplain") return new TextPlainPassword(password, operation);
		if (type === "md5") return new MD5Password(password, operation);
		if (type === "sha1") return new SHA1Password(password, operation);
		throw new Error("");
	}

	static create (type: string, password: string) {
		return PasswordFactory.build(type, password, "create");
	}

	static restore (type: string, password: string) {
		return PasswordFactory.build(type, password, "restore");
	}
}
