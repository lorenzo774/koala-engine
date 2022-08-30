import { EditorManager } from "../editor-manager.js";
import { EditorStateFactory } from "./editor-state-factory.js";

export abstract class EditorState {
    constructor(
        protected context: EditorManager,
        protected stateFactory: EditorStateFactory
    ) {
        this.onStart();
    }

    protected onStart() {}

    protected changeState(newState: EditorState) {}

    public update() {}
}
