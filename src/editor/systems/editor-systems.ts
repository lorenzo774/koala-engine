import { Entity } from "../../core/entity.js";
import { EditorManager } from "./editor-manager.js";

export class EditorSystems extends Entity {
    constructor() {
        super("editor-systems");
    }

    protected init() {
        this.components = [
            new EditorManager(this)
        ]
    }
}