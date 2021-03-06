"use strict";

const { app, ipcMain, Menu } = require("electron");
const { resolve } = require("path");
const { existsSync } = require("fs");

const { Window } = require("./core/Window");
const { Storage } = require("./core/Storage");

const { newProject, loadProject, createTicket, error } = require("./core/helper");

if (app.requestSingleInstanceLock())
	(() => {
		// Current working project, open project containing stored Buggzi data.
		let _CWP = null;

		const _globalStorePath = resolve(app.getPath("userData"), "store.json");
		this._globalStore = new Storage(_globalStorePath);

		app
			.whenReady()
			.then(async () => {
				await this._globalStore.load();
				this._app = new Window();

				Menu.setApplicationMenu(null)
			})
			.then(() => {
				// send data to render process when render is loaded
				ipcMain.once("render:ready", (e) => {
					// check paths still exists
					for (let item of this._globalStore.items) item.value.exists = existsSync(item.value.path);
					e.reply("data:load", { projects: this._globalStore.items });
				});

				// new project
				ipcMain.on("project:new", async (e) => {
					try {
						const _project = await newProject(this._app);

						for (let item of this._globalStore.items)
							if (item.value.name === _project.value.name && item.value.path === _project.value.path)
								this._globalStore.removeItem(item.key);

						this._globalStore.setItem(_project);

						e.reply("project:created", { projects: this._globalStore.items });
					} catch (err) {
						error(this._app, err.toString());
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

						e.reply("project:loaded", { projects: this._globalStore.items });
					} catch (err) {
						error(this._app, err.toString());
					}
				});
			})
			.catch((err) => {
				error(this._app, "Unable to launch application.");
			});

		// remove project
		ipcMain.on("project:remove", (e, data) => {
			this._globalStore.removeItem(data.key);
			e.reply("project:removed", { projects: this._globalStore.items });
		});

		// project open
		ipcMain.on("project:open", async (e, data) => {
			try {
				// load project data
				const _project = this._globalStore.getItem(data.key);

				// create current working project in memory if it does not exist, read in-memory data if it does.
				if (!_CWP || _CWP == null) {
					_CWP = new Storage(_project.value.path);
					await _CWP.loadR();
				}

				// send data to render
				e.reply("project:opened", { project: _project, tickets: _CWP.items });
			} catch (err) {
				error(this._app, err.toString());
			}
		});

		ipcMain.on("project:close", async (e) => {
			try {
				await _CWP.save();
				_CWP = null;
				e.reply("project:closed");
			} catch (err) {
				error(this._app, err.toString());
			}
		});

		ipcMain.on("ticket:create", async (e, data) => {
			try {
				const _ticket = createTicket(data);
				_CWP.setItem(_ticket);
			} catch (err) {
				error(this._app, err.toString());
			}
		});

		ipcMain.on("ticket:view", (e, data) => {
			e.reply("ticket:data", { ticket: _CWP.getItem(data.key) });
		});

		ipcMain.on("ticket:update", (e, data) => {
			const { key, name, status, type, priority, notes } = data;
			const _ticket = {
				key,
				value: {
					name,
					status,
					type,
					priority,
					notes,
				},
			};
			this._globalStore.setItem;
			_CWP.setItem(_ticket);
		});

		ipcMain.on("ticket:delete", (e, data) => {
			_CWP.removeItem(data.key);
		});

		app.once("window-all-closed", async () => {
			await this._globalStore.save();
			if (_CWP) {
				await _CWP.save();
				_CWP = null;
			}
			this._globalStore = null;
			this._app = null;
			app.quit();
		});
	})();
else app.exit(0);
