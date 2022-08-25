import { Component } from "../../core/component.js";
import { RigidBody } from "../../core/components/bodies/rigidbody.js";
import { CollisionBody } from "../../core/components/bodies/collisionbody.js";

export class PlayerCollision extends Component {
    private rigidBody: RigidBody;

    private onTrigger(otherBody: CollisionBody) {
        console.log(`NOT SOLID: ${otherBody.entity.name}`);
    }

    private onCollision(otherBody: CollisionBody) {
        console.log(`SOLID: ${otherBody.entity.name}`);
    }

    public start() {
        this.rigidBody = this.entity.getComponent<RigidBody>(RigidBody);
        this.rigidBody.triggerEventHandler = this.onTrigger.bind(this);
        this.rigidBody.collisionEventHandler = this.onCollision.bind(this);
    }

}
