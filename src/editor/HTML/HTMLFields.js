"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genericField = exports.vector2Field = exports.numberField = exports.booleanField = void 0;
const booleanField = (component, key) => `
    <div class="checkbox-field">
        <input id="${component.entity.name}-${key}" type="checkbox" />
        <label for="${component.entity.name}-${key}"></label>
    </div>`;
exports.booleanField = booleanField;
const numberField = (component, key) => `
    <input id="${component.entity.name}-${key}" value="${component[key]}" class="number-field" type="number" />`;
exports.numberField = numberField;
const vector2Field = (component, key) => `
    <div class="composite-field">
        <div>
            x: <input id="${component.entity.name}-${key}" value="${component[key].x}" class="number-field" type="number" /> 
        </div>
        <div>
            y: <input id="${component.entity.name}-${key}" value="${component[key].x}" class="number-field" type="number" />
        </div>
    </div>`;
exports.vector2Field = vector2Field;
const genericField = (component, key) => `
    <div class="object-field">
        <input id="${component.entity.name}-${key}" />
        <label for="${component.entity.name}-${key}">...</label>
    </div>`;
exports.genericField = genericField;
