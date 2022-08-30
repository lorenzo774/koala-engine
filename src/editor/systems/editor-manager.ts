import { Component } from "../../core/component.js";
import { EditorState } from "./FSM/editor-state.js";
import { Debug } from "../utils/debug.js";
import { UIManager } from "./ui-manager.js";
import { Scene } from "../../core/scene.js";
import { Entity } from "../../core/entity.js";
import { EditorStateFactory } from "./FSM/editor-state-factory.js";

export class EditorManager extends Component {
    // DATA
    public uiManager: UIManager;
    public entitySelected: Entity;

    public currentState: EditorState;
    private editorStateFactory: EditorStateFactory;

    /*
        STATES
    */

    // private sceneSelection() {
    //     this.uiManager.clearHierarchy();
    //     Scene.main.entities.forEach((entity) => {
    //         this.uiManager.addEntity(entity);
    //     });
    // }
    //
    // private entitySelection() {
    //     this.uiManager.clearInspector();
    //     this.uiManager.setSelectedEntityName(toPascalCase(this.entitySelected.name));
    //     this.entitySelected.components.forEach((component) =>
    //         this.uiManager.addComponent(component)
    //     );
    // }
    //
    // private componentSelection() {}
    //
    // private changeState(newState: EditorState) {
    //     if(newState === this.editorState) return;
    //     Debug.write("Changing state...");
    //     this.editorState = newState;
    // }

    /*
        EVENTS
    */

    private onEntitySelected(e) {
        let { target } = e;
        if(target.id === "hierarchy-list") return;
        if(!target.classList.contains("entity")) {
            target = target.parentNode;
        }
        const { entityName } = target.dataset;
        if (!entityName) return;

        this.entitySelected = Scene.findEntity(entityName);

        // TODO: Set entity label style
        // // Set target style
        // target.classList.add("inspector-entity-selected");
        // target.textContent = `> ${toPascalCase(this.entitySelected.name)} <`;
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

        // switch (this.editorState) {
        //     case EditorState.SceneSelection:
        //         this.sceneSelection();
        //         break;
        //     case EditorState.EntitySelection:
        //         this.entitySelection();
        //         break;
        //     case EditorState.ComponentSelection:
        //         this.componentSelection();
        //         break;
        // }
    }
}
