import { Component } from "../../core/component.js";
import { EditorState } from "./editor-state.js";
import { Debug } from "../utils/debug.js";
import { UIManager } from "./ui-manager.js";
import { Scene } from "../../core/scene.js";
import { Entity } from "../../core/entity.js";
import { toPascalCase } from "../../core/utils/helper.js";

export class EditorManager extends Component {
    private editorState: EditorState = EditorState.SceneSelection;
    private uiManager: UIManager;
    private entitySelected: Entity;

    /*
        STATES
    */

    private sceneSelection() {
        this.uiManager.clearHierarchy();
        Scene.main.entities.forEach((entity) => {
            this.uiManager.addEntity(entity);
        });
    }

    private entitySelection() {
        this.uiManager.clearInspector();
        this.uiManager.setSelectedEntityName(toPascalCase(this.entitySelected.name));
        this.entitySelected.components.forEach((component) =>
            this.uiManager.addComponent(component)
        );
    }

    private componentSelection() {}

    private changeState(newState: EditorState) {
        if(newState === this.editorState) return;
        Debug.write("Changing state...");
        this.editorState = newState;
    }

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

        this.changeState(EditorState.EntitySelection);
        this.entitySelected = Scene.findEntity(entityName);

        // TODO: Set entity label style
        // // Set target style
        // target.classList.add("inspector-entity-selected");
        // target.textContent = `> ${toPascalCase(this.entitySelected.name)} <`;
    }

    public start() {
        Debug.write("Start");
        this.uiManager = this.entity.getComponent<UIManager>(UIManager);
        this.uiManager.hierarchyList.addEventListener(
            "mouseover",
            this.onEntitySelected.bind(this)
        );
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
