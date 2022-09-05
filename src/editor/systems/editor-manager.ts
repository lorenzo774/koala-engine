import { Component } from "@koala-engine/core/component.js";
import { EditorState } from "./FSM/editor-state.js";
import { Debug } from "../utils/debug.js";
import { UIManager } from "./ui-manager.js";
import { Scene } from "@koala-engine/core/scene.js";
import { Entity } from "@koala-engine/core/entity.js";
import { EditorStateFactory } from "./FSM/editor-state-factory.js";

export class EditorManager extends Component {
    /*
        DATA
    */

    public uiManager: UIManager;
    public entitySelected: Entity;

    public currentState: EditorState;
    private editorStateFactory: EditorStateFactory;

    /*
        EVENTS
    */

    private onEntitySelected(e) {
        let { target } = e;
        if (target.id === "hierarchy-list") return;
        if (!target.classList.contains("entity")) {
            target = target.parentNode;
        }
        const { entityName } = target.dataset;
        if (!entityName) return;
        this.entitySelected = Scene.findEntity(entityName);
    }

    public start() {
        Debug.write("Start");
        // Init data
        this.uiManager = this.entity.getComponent<UIManager>(UIManager);
        this.uiManager.hierarchyList.addEventListener(
            "click",
            this.onEntitySelected.bind(this)
        );
        // Init state system
        this.editorStateFactory = new EditorStateFactory(this);
        this.currentState = this.editorStateFactory.selectScene();
    }

    // Update States
    public update() {
        this.currentState.update();
    }
}
