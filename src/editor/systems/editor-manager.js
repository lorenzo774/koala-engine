"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditorManager = void 0;
const component_js_1 = require("../../core/component.js");
const debug_js_1 = require("../utils/debug.js");
const ui_manager_js_1 = require("./ui-manager.js");
const scene_js_1 = require("../../core/scene.js");
const editor_state_factory_js_1 = require("./FSM/editor-state-factory.js");
class EditorManager extends component_js_1.Component {
    uiManager;
    entitySelected;
    currentState;
    editorStateFactory;
    onEntitySelected(e) {
        let { target } = e;
        if (target.id === "hierarchy-list")
            return;
        if (!target.classList.contains("entity")) {
            target = target.parentNode;
        }
        const { entityName } = target.dataset;
        if (!entityName)
            return;
        this.entitySelected = scene_js_1.Scene.findEntity(entityName);
    }
    start() {
        debug_js_1.Debug.write("Start");
        this.uiManager = this.entity.getComponent(ui_manager_js_1.UIManager);
        this.uiManager.hierarchyList.addEventListener("click", this.onEntitySelected.bind(this));
        this.editorStateFactory = new editor_state_factory_js_1.EditorStateFactory(this);
        this.currentState = this.editorStateFactory.selectScene();
    }
    update() {
        this.currentState.update();
    }
}
exports.EditorManager = EditorManager;
