"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseJSON = exports.loadProject = void 0;
const settings_js_1 = require("../core/settings/settings.js");
function loadProject(settingsBlob, gameBlob, scenesBlob, audiosBlob) {
    loadSettings(settingsBlob);
}
exports.loadProject = loadProject;
function loadSettings(settingsBlob) {
    const settings = JSON.parse(JSON.parse(settingsBlob));
    settings_js_1.Settings.loadSettings(settings);
}
function parseJSON(data) {
    return JSON.stringify(data);
}
exports.parseJSON = parseJSON;
