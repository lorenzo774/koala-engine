"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const editor_js_1 = require("./editor.js");
const load_project_js_1 = require("../loader/load-project.js");
const load_json_js_1 = require("./IO/load-json.js");
const canvas = document.querySelector("#canvas");
const context = canvas.getContext("2d");
const menuItemOpen = document.querySelector("#item-open");
menuItemOpen.addEventListener("click", async (_) => {
    const settingsBlob = await (0, load_json_js_1.loadJson)();
    (0, load_project_js_1.loadProject)(settingsBlob, "", "", "");
    new editor_js_1.Editor(canvas, context);
});
