import { HTMLGenerator } from "./HTMLGenerator.js";
import { Component } from "../../core/component.js";
import { Vector2 } from "../../core/math/vector2.js";
import { toPascalCase } from "../../core/utils/helper.js";

export class HTMLComponent extends HTMLGenerator {
    private static HTMLField(component: Component, key: string): string {
        let htmlField = "";
        // Simple types
        if (typeof component[key] === "boolean") {
            htmlField = `<input id="${component.constructor.name}-${key}" type="checkbox" />`;
        }
        if (typeof component[key] === "number") {
            htmlField = `<input id="${component.constructor.name}-${key}" value="${component[key]}" class="number-field" type="number" />`;
        }
        // Objects
        if (component[key] instanceof Vector2) {
            htmlField = `
                    X: <input id="${component.constructor.name}-${key}" value="${component[key].x}" class="number-field" type="number" /> 
                    Y: <input id="${component.constructor.name}-${key}" value="${component[key].x}" class="number-field" type="number" />`;
        }
        // Generic object
        if (htmlField === ""){
            htmlField = `<input id="${component.constructor.name}-${key}" class="object-field" />`
        }

        return htmlField;
    }

    public static override create(component: Component): string {
        return `
            <div class="inspector-component">
                <!-- Component name -->
                <p class="component-name">${component.constructor.name}</p>
                <!-- List of properties -->
                ${Object.keys(component)
            .map((key) => {
                if (key !== "entity") {
                    return `
                            <span>${toPascalCase(key)}: </span>
                            ${HTMLComponent.HTMLField(component, key)}
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