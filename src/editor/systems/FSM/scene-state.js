"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SceneState = void 0;
const editor_state_js_1 = require("./editor-state.js");
const scene_js_1 = require("../../../core/scene.js");
class SceneState extends editor_state_js_1.EditorState {
    onStart() {
        this.context.uiManager.clearHierarchy();
        scene_js_1.Scene.main.entities.forEach((entity) => {
            this.context.uiManager.addEntity(entity);
        });
    }
    changeState(newState) {
        this.context.currentState = newState;
    }
    update() {
        if (this.context.entitySelected) {
            this.changeState(this.stateFactory.selectEntity());
        }
    }
}
exports.SceneState = SceneState;
