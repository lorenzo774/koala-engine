import { Component } from "../../core/component.js";
import { EditorState } from "./editor-state.js";
import { Debug } from "../utils/debug.js";
import { UIManager } from "./ui-manager.js";
import { Scene } from "../../core/scene.js";

export class EditorManager extends Component {
    private editorState: EditorState = EditorState.SceneSelection;
    private uiManager: UIManager;

    private sceneSelection() {
        this.uiManager.clearHierarchy();
        this.uiManager.clearInspector();
        this.uiManager.addComponent(Scene.main.entities[0].components[0]);
        Scene.main.entities.forEach(
            entity => {
                this.uiManager.addEntity(entity)
            }
        );
    }

    private entitySelection() {
    }

    private componentSelection() {}

    private changeState(newState: EditorState) {
        Debug.write("Changing state...");
        this.editorState = newState;
    }

    public start() {
        Debug.write("Start");
        this.uiManager = this.entity.getComponent<UIManager>(UIManager);
    }

    // Update States
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
