"use strict";

const { KeyboardReturnOutlined } = require("@material-ui/icons");
const { dialog, BrowserWindow } = require("electron");
const { writeFile } = require("fs/promises");

const { uid } = require("./UID");

const filePathRegEx = /(\\|\/)/g;

/**
 * @param {BrowserWindow} context
 * @returns {Promise<object>}
 */
function newProject(context) {
	return new Promise((resolve, reject) => {
		dialog
			.showSaveDialog(context, {
				title: "Save Project",
				filters: [{ name: "Project (*.json)", extensions: ["json"] }],
			})
			.then((file) => {
				if (file.canceled) return;

				const path = file.filePath;
				const fname = path.split(filePathRegEx);
				const name = fname[fname.length - 1];

				writeFile(path, "[]", { encoding: "utf-8", flag: "w", mode: 0o666 })
					.then(() => {
						resolve({
							key: uid(),
							value: {
								name,
								path,
								exists: true,
							},
						});
					})
					.catch((err) => {
						console.error(err);
						reject("Unable to create project.");
					});
			})
			.catch((err) => {
				console.error(err);
				reject("Unable to create project.");
			});
	});
}

/**
 * @param {BrowserWindow} context
 * @returns {Promise<object>}
 */
function loadProject(context) {
	return new Promise((resolve, reject) => {
		dialog
			.showOpenDialog(context, {
				title: "Load Project",
				filters: [{ name: "Project (*.json)", extensions: ["json"] }],
				properties: ["openFile"],
			})
			.then((file) => {
				if (file.canceled) return;

				const path = file.filePaths[0];

				const fname = path.split(filePathRegEx);
				const name = fname[fname.length - 1];

				resolve({
					key: uid(),
					value: {
						name,
						path,
						exists: true,
					},
				});
			})
			.catch((err) => {
				console.error(err);
				reject("Unable to load project.");
			});
	});
}

/**
 * @param {BrowserWindow} context
 * @param {string} message
 */
function error(context, message) {
	dialog.showMessageBox(context, { message, title: "Oops, looks like something went wrong" });
	return;
}

module.exports = { newProject, loadProject, error };
