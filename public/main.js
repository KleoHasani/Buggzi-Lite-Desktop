"use strict";

const { app, ipcMain } = require("electron");
const { resolve } = require("path");
const { existsSync } = require("fs");

const { Window } = require("./core/Window");
const { Storage } = require("./core/Storage");

const { newProject, loadProject, error } = require("./core/helper");

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

				// new project
				ipcMain.on("project:new", async (e) => {
					try {
						const _project = await newProject(this._app);
						this._globalStore.setItem(_project);
						e.reply("project:created", { projects: Array.from(this._globalStore.items) });
					} catch (err) {
						error(this._app, err);
					}
				});

				// load project
				ipcMain.on("project:load", async (e) => {
					try {
						const _project = await loadProject(this._app);
						for (let item of this._globalStore.items)
							if (item.value.name === _project.value.name && item.value.path === _project.value.path)
								this._globalStore.removeItem(item.key);

						this._globalStore.setItem(_project);
						e.reply("project:loaded", { projects: Array.from(this._globalStore.items) });
					} catch (err) {
						error(this._app, err);
					}
				});
			})
			.catch((err) => {
				console.error(err);
				error(this._app, "Unable to launch application.");
			});

		app.once("window-all-closed", async () => {
			await this._globalStore.save();
			this._app = null;
			app.quit();
		});
	})();
else app.exit(0);
