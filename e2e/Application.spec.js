const Application = require("spectron").Application;
const assert = require("assert");

describe("Application launch", function () {
	this.timeout(10000);

	before(async function () {
		this.app = new Application({
			path: "dist/Buggzi-0.0.1.AppImage",
			args: ["."],
		});
		return this.app.start();
	});

	after(function () {
		if (this.app && this.app.isRunning()) {
			return this.app.stop();
		}
	});

	it("Should show an initial window.", async function () {
		const count = await this.app.client.getWindowCount();
		assert.strictEqual(count, 1);
		const title = await this.app.client.getTitle();
		assert.strictEqual(title, "Buggzi");
	});
});
