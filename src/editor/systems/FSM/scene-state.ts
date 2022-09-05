import { EditorState } from "./editor-state.js";
import { Scene } from "@koala-engine/core/scene.js";

export class SceneState extends EditorState {
    public onStart() {
        this.context.uiManager.clearHierarchy();
        Scene.main.entities.forEach((entity) => {
            this.context.uiManager.addEntity(entity);
        });
    }

    public changeState(newState: EditorState) {
        this.context.currentState = newState;
    }

    public update() {
        if (this.context.entitySelected) {
            this.changeState(this.stateFactory.selectEntity());
        }
    }
}
