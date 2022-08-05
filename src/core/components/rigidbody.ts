import { Settings } from "../../settings.js";
import { CollisionBox } from "../collision-box.js";
import { Entity } from "../entity.js";
import { Vector2 } from "../math/vector2.js";
import { CollisionBody } from "./collisionbody.js";
import { Transform } from "./transform.js";

export class RigidBody extends CollisionBody {
    private fallingFactor: number;
    private velocity: Vector2;

    constructor(
        entity: Entity,
        collisionBox: CollisionBox = new CollisionBox(
            Vector2.ZERO,
            new Vector2(100, 100)
        ),
        private mass: number = 1
    ) {
        super(entity, collisionBox);
    }

    protected onCollision() {}

    start() {
        this.fallingFactor = Settings.GRAVITY * this.mass;
        this.velocity = Vector2.ZERO;
        this.transform = this.entity.getComponent<Transform>(Transform);
    }

    update() {
        this.velocity.y += this.fallingFactor;

        // Update position
        this.transform.position.x += this.velocity.x;
        this.transform.position.y += this.velocity.y;
    }

    // String
    toString = (): string => {
        return `Rigidbody of ${this.entity.name}`;
    };
}
