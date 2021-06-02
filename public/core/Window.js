"use strict";

const { BrowserWindow } = require("electron");

const { view, preload, icon } = require("./load");

class Window extends BrowserWindow {
	constructor() {
		super({
			width: 800,
			height: 600,
			minWidth: 800,
			minHeight: 600,
			fullscreenable: false,
			transparent: false,
			frame: true,
			show: false,
			icon: icon(),
			webPreferences: {
				preload: preload,
				webSecurity: true,
				contextIsolation: true,
				worldSafeExecuteJavaScript: true,
				nodeIntegration: false,
				nodeIntegrationInWorker: false,
				nodeIntegrationInSubFrames: false,
				enableRemoteModule: false,
				allowRunningInsecureContent: false,
				plugins: false,
				experimentalFeatures: false,
			},
		});

		this.loadURL(view);

		this.setMenu(null);

		this.once("ready-to-show", () => {
			this.show();
			this.focus();
		});
	}
}

module.exports = { Window };
