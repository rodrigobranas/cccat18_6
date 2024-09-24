export default class Password {
	private value: string;

	constructor (value: string) {
		if (value.length < 6) throw new Error("Invalid password");
		this.value = value;
	}

	getValue () {
		return this.value;
	}
}