import { Component } from "../../core/component.js";
import { Entity } from "../../core/entity";

export class UIManager extends Component {
    private readonly hierarchyList = document.querySelector("#hierarchy-list");

    /*
        HIERARCHY
    */
    public clearHierarchy() {
        this.hierarchyList.innerHTML = "";
    }

    public addEntity(newEntity: Entity) {
        this.hierarchyList.innerHTML += newEntity.toHTML();
    }
}
