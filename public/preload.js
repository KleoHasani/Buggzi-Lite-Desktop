"use strict";

const { contextBridge, ipcRenderer } = require("electron");

const ALLOWED_CHANNELS = [
	"render:ready",
	"data:load",
	"project:new",
	"project:created",
	"project:load",
	"project:loaded",
	"project:remove",
	"project:removed",
	"project:open",
	"project:opened",
	"project:close",
	"project:closed",
	"ticket:create",
	"ticket:created",
	"ticket:view",
	"ticket:data",
	"ticket:update",
	"ticket:updated",
	"ticket:delete",
	"ticket:deleted",
];

contextBridge.exposeInMainWorld("electron", {
	/**
	 * @param {string} channel
	 * @param {any} data
	 * @returns {void}
	 */
	ipcSend: (channel, data) => {
		if (ALLOWED_CHANNELS.includes(channel)) return ipcRenderer.send(channel, data);
		else throw new Error(`Channel "${channel}" is not allowed`);
	},

	/**
	 * @param {string} channel
	 * @param {function} listener
	 * @param {IpcRendererEvent} listener.event
	 * @param {any[]} listener.args
	 * @returns {void}
	 */
	ipcOn: (channel, listener) => {
		if (ALLOWED_CHANNELS.includes(channel)) return ipcRenderer.on(channel, listener);
		else throw new Error(`Channel "${channel}" is not allowed`);
	},

	/**
	 * @param {string} channel
	 * @param {function} listener
	 * @param {IpcRendererEvent} listener.event
	 * @param {any[]} listener.args
	 * @returns {void}
	 */
	ipcOnce: (channel, listener) => {
		if (ALLOWED_CHANNELS.includes(channel)) return ipcRenderer.once(channel, listener);
		else throw new Error(`Channel "${channel}" is not allowed`);
	},

	/**
	 * @returns {IpcRenderer}
	 */
	ipcRemoveAllListeners: () => {
		return ipcRenderer.removeAllListeners();
	},
});
