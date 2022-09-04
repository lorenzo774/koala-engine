"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityState = void 0;
const editor_state_js_1 = require("./editor-state.js");
const helper_js_1 = require("../../../core/utils/helper.js");
class EntityState extends editor_state_js_1.EditorState {
    lastEntitySelected;
    setTargetEntityFocus() {
        const target = document.querySelector(`[data-entity-name="${this.context.entitySelected.name}"]`);
        console.log(target);
        target.classList.add("inspector-entity-selected");
        this.context.uiManager.setSelectedEntityName((0, helper_js_1.toPascalCase)(this.context.entitySelected.name));
        target.innerHTML = `<p>> ${(0, helper_js_1.toPascalCase)(this.context.entitySelected.name)} <</p>`;
    }
    disableLastTargetEntityFocus() {
        const target = document.querySelector(`[data-entity-name="${this.lastEntitySelected.name}"]`);
        target.classList.remove("inspector-entity-selected");
        target.innerHTML = `<p>${(0, helper_js_1.toPascalCase)(this.lastEntitySelected.name)}</p>`;
    }
    setInspectorComponents() {
        this.context.uiManager.clearInspector();
        this.context.entitySelected.components.forEach((component) => this.context.uiManager.addComponent(component));
    }
    setUIEntitySelected() {
        this.setTargetEntityFocus();
        this.disableLastTargetEntityFocus();
        this.setInspectorComponents();
    }
    onStart() {
        this.setTargetEntityFocus();
        this.setInspectorComponents();
        this.lastEntitySelected = this.context.entitySelected;
    }
    changeState(newState) { }
    update() {
        if (this.lastEntitySelected) {
            if (this.lastEntitySelected.name !==
                this.context.entitySelected.name) {
                this.setUIEntitySelected();
            }
        }
        this.lastEntitySelected = this.context.entitySelected;
    }
}
exports.EntityState = EntityState;
