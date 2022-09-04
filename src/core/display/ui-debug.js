"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UIDebug = void 0;
const settings_js_1 = require("../settings/settings.js");
const scene_js_1 = require("../scene.js");
class UIDebug {
    static i;
    static get I() {
        if (!UIDebug.i) {
            UIDebug.i = new UIDebug();
        }
        return UIDebug.i;
    }
    entityList = document.querySelector("#ui-entity");
    sceneLbl = document.querySelector("#debug-scene-name");
    fpsLbl = document.querySelector("#fps");
    toggleDebugUI = document.querySelector("#toggle-debug-mode");
    constructor() {
        if (!this.toggleDebugUI)
            return;
        this.toggleDebugUI.addEventListener("click", (_) => {
            settings_js_1.Settings.main.DEBUG_MODE = !settings_js_1.Settings.main.DEBUG_MODE;
            this.toggleDebugUI.textContent = settings_js_1.Settings.main.DEBUG_MODE ? "ON" : "OFF";
            this.toggleDebugUI.classList.toggle("on");
            this.toggleDebugUI.classList.toggle("off");
        });
    }
    showDebugUI() {
        document.querySelectorAll(".ui-debug").forEach((el) => {
            el.classList.remove("hide");
        });
    }
    run(entities, fps) {
        this.sceneLbl.textContent = `Scene: ${scene_js_1.Scene.main.name}`;
        this.fpsLbl.textContent = `FPS: ${fps.toFixed(0)}`;
        this.entityList.innerHTML = entities
            .map((entity) => `<li> - ${entity.name}</li>`)
            .join("");
    }
}
exports.UIDebug = UIDebug;
