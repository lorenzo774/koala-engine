"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollisionBody = void 0;
const component_js_1 = require("../../component.js");
const vector2_js_1 = require("../../math/vector2.js");
const transform_js_1 = require("../transform.js");
class CollisionBody extends component_js_1.Component {
    solid;
    _collisionEventHandler;
    _triggerEventHandler;
    transform;
    position;
    set collisionEventHandler(callback) {
        this._collisionEventHandler = callback;
    }
    set triggerEventHandler(callback) {
        this._triggerEventHandler = callback;
    }
    constructor(entity, solid = true) {
        super(entity);
        this.solid = solid;
        this.transform = entity.getComponent(transform_js_1.Transform);
    }
    start() {
        this.position = vector2_js_1.Vector2.ZERO;
        this.position = this.transform.position;
    }
    onCollision(otherBody) {
        if (!this._collisionEventHandler)
            return;
        this._collisionEventHandler(otherBody);
    }
    onTrigger(otherBody) {
        if (!this._triggerEventHandler)
            return;
        this._triggerEventHandler(otherBody);
    }
}
exports.CollisionBody = CollisionBody;
