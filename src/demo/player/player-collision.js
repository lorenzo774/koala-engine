"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerCollision = void 0;
const component_js_1 = require("../../core/component.js");
const rigidbody_js_1 = require("../../core/components/bodies/rigidbody.js");
class PlayerCollision extends component_js_1.Component {
    rigidBody;
    onTrigger(otherBody) {
        console.log(`NOT SOLID: ${otherBody.entity.name}`);
    }
    onCollision(otherBody) {
        console.log(`SOLID: ${otherBody.entity.name}`);
    }
    start() {
        this.rigidBody = this.entity.getComponent(rigidbody_js_1.RigidBody);
        this.rigidBody.triggerEventHandler = this.onTrigger.bind(this);
        this.rigidBody.collisionEventHandler = this.onCollision.bind(this);
    }
}
exports.PlayerCollision = PlayerCollision;
