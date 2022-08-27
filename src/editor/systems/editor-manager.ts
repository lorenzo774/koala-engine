import { Component } from "../../core/component.js";
import { EditorState } from "./editor-state.js";
import { Debug } from "../utils/debug.js";

export class EditorManager extends Component {
    private editorState: EditorState = EditorState.SceneSelection;

    private sceneSelection() {}

    private entitySelection() {}

    private componentSelection() {}

    private changeState(newState: EditorState) {
        Debug.writeLine("Changing state...");
        this.editorState = newState;
    }

    public start() {
        Debug.writeLine("Start");
    }

    public update() {
        switch (this.editorState) {
            case EditorState.SceneSelection:
                this.sceneSelection();
                break;
            case EditorState.EntitySelection:
                this.entitySelection();
                break;
            case EditorState.ComponentSelection:
                this.componentSelection();
                break;
        }
    }
}
