"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UIManager = void 0;
const component_js_1 = require("../../core/component.js");
const HTMLComponent_js_1 = require("../HTML/HTMLComponent.js");
const HTMLEntity_js_1 = require("../HTML/HTMLEntity.js");
class UIManager extends component_js_1.Component {
    inspectorEntityName = document.querySelector("#inspector-entity-name");
    hierarchyList = document.querySelector("#hierarchy-list");
    inspectorList = document.querySelector("#inspector-list");
    clearHierarchy() {
        this.hierarchyList.innerHTML = "";
    }
    addEntity(newEntity) {
        this.hierarchyList.innerHTML += HTMLEntity_js_1.HTMLEntity.create(newEntity);
    }
    clearInspector() {
        this.inspectorList.innerHTML = "";
    }
    addComponent(newComponent) {
        this.inspectorList.innerHTML += HTMLComponent_js_1.HTMLComponent.create(newComponent);
    }
    setSelectedEntityName(name) {
        this.inspectorEntityName.textContent = name;
    }
}
exports.UIManager = UIManager;
