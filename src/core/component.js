"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Component = void 0;
class Component {
    entity;
    constructor(entity) {
        this.entity = entity;
    }
    start() { }
    draw(ctx) { }
    debugDraw(ctx) { }
    update() { }
    physicsUpdate() { }
}
exports.Component = Component;
