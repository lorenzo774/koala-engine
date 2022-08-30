import { EditorManager } from "../editor-manager.js";
import { EntityState } from "./entity-state.js";
import { SettingsState } from "./settings-state.js";
import { SceneState } from "./scene-state.js";

export class EditorStateFactory {
    constructor(private context: EditorManager) {}

    public selectEntity = () => new EntityState(this.context, this);
    public changeSettings = () => new SettingsState(this.context, this);
    public selectScene = () => new SceneState(this.context, this);
}