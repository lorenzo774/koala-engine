"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTMLComponent = void 0;
const HTMLGenerator_js_1 = require("./HTMLGenerator.js");
const vector2_js_1 = require("../../core/math/vector2.js");
const helper_js_1 = require("../../core/utils/helper.js");
const HTMLFields_js_1 = require("./HTMLFields.js");
class HTMLComponent extends HTMLGenerator_js_1.HTMLGenerator {
    static HTMLField(component, key) {
        let htmlField = "";
        if (typeof component[key] === "boolean") {
            htmlField = (0, HTMLFields_js_1.booleanField)(component, key);
        }
        if (typeof component[key] === "number") {
            htmlField = (0, HTMLFields_js_1.numberField)(component, key);
        }
        if (component[key] instanceof vector2_js_1.Vector2) {
            htmlField = (0, HTMLFields_js_1.vector2Field)(component, key);
        }
        if (htmlField === "") {
            htmlField = (0, HTMLFields_js_1.genericField)(component, key);
        }
        return htmlField;
    }
    static create(component) {
        return `
            <div class="inspector-component">
                <div class="horizontal">
                    <!-- Component name -->
                    <p class="component-name">${component.constructor.name}</p>
                    <!-- Remove button -->
                    <button class="remove-button">x</button>
                </div>
                <!-- List of properties -->
                ${Object.keys(component)
            .map((key) => {
            if (key !== "entity") {
                return `
                        <div class="field">
                            <span>${(0, helper_js_1.toPascalCase)(key)}: </span>
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
exports.HTMLComponent = HTMLComponent;
