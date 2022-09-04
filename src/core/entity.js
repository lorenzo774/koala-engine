"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entity = void 0;
const transform_js_1 = require("./components/transform.js");
const collisionbody_js_1 = require("./components/bodies/collisionbody.js");
class Entity {
    name;
    _components;
    get components() {
        return this._components;
    }
    set components(value) {
        this._components = [...this._components, ...value];
    }
    constructor(name, _components = []) {
        this.name = name;
        this._components = _components;
        this.addComponent(new transform_js_1.Transform(this));
    }
    load() {
        this.init();
        this.start();
        this._components.forEach((component) => component.start());
    }
    init() { }
    start() { }
    addComponent(newComponent) {
        this._components.push(newComponent);
        return newComponent;
    }
    getComponent(component) {
        return this._components.find((c) => c instanceof component);
    }
    getBody(component) {
        return this._components.find((c) => c instanceof collisionbody_js_1.CollisionBody);
    }
    draw(ctx) {
        this._components.forEach((component) => {
            component.draw(ctx);
        });
    }
    debugDraw(ctx) {
        this._components.forEach((component) => {
            component.debugDraw(ctx);
        });
    }
    update() {
        this._components.forEach((component) => {
            component.update();
        });
    }
    physicsUpdate() {
        this._components.forEach((component) => {
            component.physicsUpdate();
        });
    }
}
exports.Entity = Entity;
