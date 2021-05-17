"use strict";

const { app, ipcMain } = require("electron");
const { resolve } = require("path");
const { existsSync } = require("fs");

const { Window } = require("./core/Window");
const { Storage } = require("./core/Storage");

if (app.requestSingleInstanceLock())
	(() => {
		let _CWD = null; // store current working JSON document open for project Buggzi data.

		const _globalStorePath = resolve(app.getPath("userData"), "store.json");
		this._globalStore = new Storage(_globalStorePath);

		app.whenReady()
			.then(async () => {
				await this._globalStore.load();
				this._app = new Window();
			})
			.then(() => {
				// send data to render process when render is loaded
				ipcMain.once("render:ready", (e) => {
					// check paths still exists
					for (let item of this._globalStore.items) item.value.exists = existsSync(item.value.path);
					e.reply("data:load", { projects: Array.from(this._globalStore.items) });
				});
			})
			.catch((err) => {
				console.error(err);
			});

		app.once("window-all-closed", async () => {
			this._app = null;
			app.quit();
		});
	})();
else app.exit(0);
