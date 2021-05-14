"use strict";

const assert = require("assert");
const { Storage } = require("../public/core/Storage");

const { resolve } = require("path");
const { mkdir, rm } = require("fs/promises");

describe("Storage - Test", () => {
	const _path = resolve(__dirname, "../", "__out__");
	const _name = "store.json";

	const item = {
		key: "0123456789",
		value: "item",
	};

	before(async () => {
		await mkdir(_path);
		this.store = new Storage(resolve(_path, _name));
		await this.store.load();
	});

	after(async () => {
		await rm(_path, { recursive: true });
	});

	it("Should have length of 0.", () => {
		assert.strictEqual(this.store.length, 0);
	});

	it("Should add 1 item to store.", () => {
		this.store.setItem(item);
		assert.strictEqual(this.store.length, 1);
	});

	it("Should get 1 item from store.", () => {
		const _item = this.store.getItem(item.key);
		assert.strictEqual(item, _item);
	});

	it('Should update item value to "updated item".', () => {
		const _item = item;
		_item.value = "updated item";
		assert.strictEqual(_item.value, "updated item");
	});

	it('Should update item key to "0000000000".', () => {
		const _item = item;
		_item.key = "0000000000";
		assert.strictEqual(_item.key, "0000000000");
	});

	it("Should delete 1 item.", () => {
		this.store.removeItem(item.key);
		assert.strictEqual(this.store.length, 0);
	});
});
