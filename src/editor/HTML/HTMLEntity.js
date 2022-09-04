"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTMLEntity = void 0;
const HTMLGenerator_js_1 = require("./HTMLGenerator.js");
class HTMLEntity extends HTMLGenerator_js_1.HTMLGenerator {
    static create(entity) {
        return `
            <div class="entity" data-entity-name="${entity.name}">
                <p>${entity.constructor.name}</p>
            </div>
        `;
    }
}
exports.HTMLEntity = HTMLEntity;
