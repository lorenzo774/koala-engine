import { Entity } from "./entity.js";
import { toPascalCase } from "./utils/helper.js";

export abstract class Component {
    constructor(public entity: Entity) {}

    public start() {}

    public draw(ctx: CanvasRenderingContext2D) {}

    public debugDraw(ctx: CanvasRenderingContext2D) {}

    public update() {}

    public physicsUpdate() {}

    public toHTML(): string {
        return `
            <div class="inspector-component">
                <!-- Component name -->
                <h2>${this.constructor.name}</h2>
                <!-- List of properties -->
                ${Object.keys(this)
                    .map((key) => {
                        if (key !== "entity") {
                            return `
                            <span>${toPascalCase(key)}: </span>
                            <span>${this[key]}</span>
                            <br />
                        `;
                        }
                        return ``;
                    })
                    .join("")}
            </div>
        `;
    }
}
