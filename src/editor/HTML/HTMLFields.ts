import { Component } from "../../core/component.js";

export const booleanField = (component: Component, key: string): string => `
    <div class="checkbox-field">
        <input id="${component.entity.name}-${key}" type="checkbox" />
        <label for="${component.entity.name}-${key}"></label>
    </div>`;

export const numberField = (component: Component, key: string): string => `
    <input id="${component.entity.name}-${key}" value="${component[key]}" class="number-field" type="number" />`;

export const vector2Field = (component: Component, key: string): string => `
    <div class="composite-field">
        <div>
            x: <input id="${component.entity.name}-${key}" value="${component[key].x}" class="number-field" type="number" /> 
        </div>
        <div>
            y: <input id="${component.entity.name}-${key}" value="${component[key].x}" class="number-field" type="number" />
        </div>
    </div>`;

export const genericField = (component: Component, key: string): string => `
    <div class="object-field">
        <input id="${component.entity.name}-${key}" />
        <label for="${component.entity.name}-${key}">...</label>
    </div>`;
