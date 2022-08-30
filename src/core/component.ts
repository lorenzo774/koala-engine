import { Entity } from "./entity.js";
import { toPascalCase } from "./utils/helper.js";
import { Vector2 } from "./math/vector2.js";

export abstract class Component {
    constructor(public entity: Entity) {}

    public start() {}

    public draw(ctx: CanvasRenderingContext2D) {}

    public debugDraw(ctx: CanvasRenderingContext2D) {}

    public update() {}

    public physicsUpdate() {}

    public toHTML(): string {
        const getHTMLField = (key) => {
            let htmlField = "";
            // Simple types
            if (typeof this[key] === "boolean") {
                htmlField = `<input id="${this.constructor.name}-${key}" type="checkbox" />`;
            }
            if (typeof this[key] === "number") {
                htmlField = `<input id="${this.constructor.name}-${key}" value="${this[key]}" class="number-field" type="number" />`;
            }
            // Objects
            if (this[key] instanceof Vector2) {
                htmlField = `
                    X: <input id="${this.constructor.name}-${key}" value="${this[key].x}" class="number-field" type="number" /> 
                    Y: <input id="${this.constructor.name}-${key}" value="${this[key].x}" class="number-field" type="number" />`;
            }
            // Generic object
            if (htmlField === ""){
                htmlField = `<input id="${this.constructor.name}-${key}" class="object-field" />`
            }

                return htmlField;
        };

        return `
            <div class="inspector-component">
                <!-- Component name -->
                <p class="component-name">${this.constructor.name}</p>
                <!-- List of properties -->
                ${Object.keys(this)
                    .map((key) => {
                        if (key !== "entity") {
                            return `
                            <span>${toPascalCase(key)}: </span>
                            ${getHTMLField(key)}
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
