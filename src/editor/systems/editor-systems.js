"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditorSystems = void 0;
const entity_js_1 = require("../../core/entity.js");
const editor_manager_js_1 = require("./editor-manager.js");
const ui_manager_js_1 = require("./ui-manager.js");
class EditorSystems extends entity_js_1.Entity {
    constructor() {
        super("editor-systems");
    }
    init() {
        this.components = [
            new editor_manager_js_1.EditorManager(this),
            new ui_manager_js_1.UIManager(this),
        ];
    }
}
exports.EditorSystems = EditorSystems;
