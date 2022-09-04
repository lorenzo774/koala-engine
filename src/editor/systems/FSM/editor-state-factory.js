"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditorStateFactory = void 0;
const entity_state_js_1 = require("./entity-state.js");
const settings_state_js_1 = require("./settings-state.js");
const scene_state_js_1 = require("./scene-state.js");
class EditorStateFactory {
    context;
    constructor(context) {
        this.context = context;
    }
    selectEntity = () => new entity_state_js_1.EntityState(this.context, this);
    changeSettings = () => new settings_state_js_1.SettingsState(this.context, this);
    selectScene = () => new scene_state_js_1.SceneState(this.context, this);
}
exports.EditorStateFactory = EditorStateFactory;
