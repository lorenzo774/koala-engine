import { HTMLGenerator } from "./HTMLGenerator.js";
import { Component } from "../../core/component.js";
import { Vector2 } from "../../core/math/vector2.js";
import { toPascalCase } from "../../core/utils/helper.js";
import { booleanField, genericField, numberField, vector2Field } from "./HTMLFields.js";

export class HTMLComponent extends HTMLGenerator {

    private static HTMLField(component: Component, key: string): string {
        let htmlField = "";
        // Simple types
        if (typeof component[key] === "boolean") {
            htmlField = booleanField(component, key);
        }
        if (typeof component[key] === "number") {
            htmlField = numberField(component, key);
        }
        // Objects
        if (component[key] instanceof Vector2) {
            htmlField = vector2Field(component, key);
        }
        // Generic object
        if (htmlField === ""){
            htmlField = genericField(component, key);
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
                        <div class="field">
                            <span>${toPascalCase(key)}: </span>
                            ${HTMLComponent.HTMLField(component, key)}
                        </div>
                    `;
                }
                return ``;
            })
            .join("")}
            </div>
        `;
    }
}