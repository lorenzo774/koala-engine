"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadJson = void 0;
const settings_js_1 = require("./settings.js");
async function loadJson() {
    const [fileHandle] = await window.showOpenFilePicker(settings_js_1.settings);
    if (fileHandle.kind === "file") {
        const file = await fileHandle.getFile();
        const contents = await file.text();
        return JSON.stringify(contents);
    }
    return null;
}
exports.loadJson = loadJson;
