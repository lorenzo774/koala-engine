import { HTMLGenerator } from "./HTMLGenerator.js";
import { Entity } from "@koala-engine/core/entity.js";

export class HTMLEntity extends HTMLGenerator {
    public static create(entity: Entity): string {
        return `
            <div class="entity" data-entity-name="${entity.name}">
                <p>${entity.constructor.name}</p>
            </div>
        `;
    }
}
