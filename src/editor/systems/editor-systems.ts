import { Entity } from "@koala-engine/core/entity.js";
import { EditorManager } from "./editor-manager.js";
import { UIManager } from "./ui-manager.js";

export class EditorSystems extends Entity {
    constructor() {
        super("editor-systems");
    }

    protected init() {
        this.components = [new EditorManager(this), new UIManager(this)];
    }
}
