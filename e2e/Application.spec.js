const Application = require("spectron").Application;
const assert = require("assert");

describe("Application launch", function () {
	this.timeout(10000);

	before(async () => {
		this.app = new Application({
			path: "dist/Buggzi-0.0.1.AppImage",
			args: ["."],
		});
		await this.app.start();
	});

	after(() => {
		if (this.app && this.app.isRunning()) {
			return this.app.stop();
		}
	});

	it("Should show an initial window.", async () => {
		const count = await this.app.client.getWindowCount();
		assert.strictEqual(count, 1);
	});

	it('Should have title "Buggzi".', async () => {
		const title = await this.app.client.getTitle();
		assert.strictEqual(title, "Buggzi");
	});
});
