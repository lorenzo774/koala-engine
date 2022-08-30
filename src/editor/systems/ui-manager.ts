import { Component } from "../../core/component.js";
import { Entity } from "../../core/entity.js";
import { HTMLComponent } from "../HTML/HTMLComponent.js";
import { HTMLEntity } from "../HTML/HTMLEntity.js";

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
        this.hierarchyList.innerHTML += HTMLEntity.create(newEntity);
    }

    /*
        INSPECTOR
    */
    public clearInspector() {
        this.inspectorList.innerHTML = "";
    }

    public addComponent(newComponent: Component) {
        this.inspectorList.innerHTML += HTMLComponent.create(newComponent);
    }

    public setSelectedEntityName(name: string) {
        this.inspectorEntityName.textContent = name;
    }
}
