"use strict";

const { app } = require("electron");
const { resolve } = require("path");

const _isDev = process.argv.includes("developement");

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

const view = _isDev ? "http://localhost:3000" : `file://${resolve(_base, "build", "index.html")}`;
const preload = _isDev ? resolve(_base, "preload.js") : resolve(_base, "build", "preload.js");

module.exports = { icon, view, preload };
