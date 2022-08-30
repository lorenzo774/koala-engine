import { EditorState } from "./editor-state.js";
import { Entity } from "../../../core/entity.js";
import { toPascalCase } from "../../../core/utils/helper.js";

export class EntityState extends EditorState {
    private lastEntitySelected: Entity;

    /*
     * Set focus on selected entity
     * */
    private setTargetEntityFocus() {
        const target = document.querySelector(
            `[data-entity-name="${this.context.entitySelected.name}"]`
        );
        console.log(target);
        target.classList.add("inspector-entity-selected");
        this.context.uiManager.setSelectedEntityName(toPascalCase(this.context.entitySelected.name));
        target.innerHTML = `<p>> ${toPascalCase(
            this.context.entitySelected.name
        )} <</p>`;
    }

    /*
     * Disable focus on last selected entity
     * */
    private disableLastTargetEntityFocus() {
        const target = document.querySelector(
            `[data-entity-name="${this.lastEntitySelected.name}"]`
        );
        target.classList.remove("inspector-entity-selected");
        target.innerHTML = `<p>${toPascalCase(
            this.lastEntitySelected.name
        )}</p>`;
    }

    private setInspectorComponents() {
        this.context.uiManager.clearInspector();
        this.context.entitySelected.components.forEach((component) =>
            this.context.uiManager.addComponent(component)
        );
    }

    /*
     * Call methods to set the UI for entity selected
     * */
    private setUIEntitySelected() {
        this.setTargetEntityFocus();
        this.disableLastTargetEntityFocus();
        this.setInspectorComponents();
    }

    public onStart() {
        this.setTargetEntityFocus();
        this.setInspectorComponents();
        this.lastEntitySelected = this.context.entitySelected;
    }

    public changeState(newState: EditorState) {}

    public update() {
        if (this.lastEntitySelected) {
            if (
                this.lastEntitySelected.name !==
                this.context.entitySelected.name
            ) {
                this.setUIEntitySelected();
            }
        }
        this.lastEntitySelected = this.context.entitySelected;
    }
}