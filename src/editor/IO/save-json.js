"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveJson = void 0;
const settings_js_1 = require("./settings.js");
async function saveJson(data) {
    const [fileHandle] = await window.showSaveFilePicker(settings_js_1.settings);
    if (fileHandle.kind === "file") {
        const writableStream = await fileHandle.createWritable();
        await writableStream.write(JSON.stringify(data));
        await writableStream.close();
    }
    return null;
}
exports.saveJson = saveJson;
