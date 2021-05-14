"use strict";

const { app } = require("electron");
const { resolve } = require("path");

const _base = app.getAppPath();

/**
 * @returns {string}
 */
function icon() {
	let _ext = "png";
	switch (process.platform) {
		case "darwin":
			_ext = "icns";
		case "win32":
			_ext = "ico";
		default:
			break;
	}
	return resolve(_base, "icons", `icon.${_ext}`);
}

const view = resolve(_base, "build", "index.html");

module.exports = { icon, view };
