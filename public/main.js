"use strict";

const { app } = require("electron");
const { resolve } = require("path");

const { Window } = require("./core/Window");
const { Storage } = require("./core/Storage");

if (app.requestSingleInstanceLock())
	(() => {
		const _globalStorePath = resolve(app.getPath("userData"), "store.json");
		this._globalStore = new Storage(_globalStorePath);

		app.whenReady()
			.then(async () => {
				await this._globalStore.load();
				this._app = new Window();
			})
			.then(() => {})
			.catch((err) => {
				console.error(err);
			});

		app.once("window-all-closed", async () => {
			this._app = null;
			app.quit();
		});
	})();
else app.exit(0);
