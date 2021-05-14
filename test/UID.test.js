"use strict";

const assert = require("assert");
const { uid } = require("../public/core/UID");

describe("UID - Test", () => {
	it("Should generate random 16 byte string.", () => {
		const _uid = uid();
		assert.strictEqual(_uid.length, 32);
	});
});
