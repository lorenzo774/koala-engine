import { Component } from "../../core/component.js";
import { Entity } from "../../core/entity.js";

export class UIManager extends Component {
    private readonly inspectorEntityName = document.querySelector("#inspector-entity-name");
    public readonly hierarchyList = document.querySelector("#hierarchy-list");
    public readonly inspectorList = document.querySelector("#inspector-list");

    /*
        HIERARCHY
    */
    public clearHierarchy() {
        this.hierarchyList.innerHTML = "";
    }

    public addEntity(newEntity: Entity) {
        this.hierarchyList.innerHTML += newEntity.toHTML();
    }

    /*
        INSPECTOR
    */
    public clearInspector() {
        this.inspectorList.innerHTML = "";
    }

    public addComponent(newComponent: Component) {
        this.inspectorList.innerHTML += newComponent.toHTML();
    }

    public setSelectedEntityName(name: string) {
        this.inspectorEntityName.textContent = name;
    }
}
