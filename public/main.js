"use strict";

const { app } = require("electron");

const { Window } = require("./core/Window");

if (app.requestSingleInstanceLock())
	(() => {
		app.once("ready", () => {
			this.window = new Window();
		});

		app.once("window-all-closed", () => {
			app.quit();
		});
	})();
else app.exit(0);
