import { Settings } from "../../settings.js";
import { CollisionBox } from "../collision-box.js";
import { Entity } from "../entity.js";
import { Vector2 } from "../math/vector2.js";
import { CollisionBody } from "./collisionbody.js";

export class RigidBody extends CollisionBody {
    private fallingFactor: number;
    public velocity: Vector2 = Vector2.ZERO;

    public onGround: boolean = false;

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

    protected onCollision() {
        this.onGround = true;
    }

    protected exitCollision() {
        this.onGround = false;
    }

    start() {
        super.start();
        this.fallingFactor = Settings.GRAVITY * this.mass;
        this.velocity = Vector2.ZERO;
    }

    checkCollision(otherCollisionBody: CollisionBody) {
        if (
            // Check Y
            this.position.y + this.collisionBox.size.y + this.velocity.y >
                otherCollisionBody.position.y &&
            this.position.y + this.velocity.y <
                otherCollisionBody.position.y +
                    otherCollisionBody.collisionBox.size.y &&
            // Check X
            this.position.x + this.collisionBox.size.x + this.velocity.x >
                otherCollisionBody.position.x &&
            this.position.x + this.velocity.x <
                otherCollisionBody.position.x +
                    otherCollisionBody.collisionBox.size.x
        ) {
            this.onCollision();
        } else {
            this.exitCollision();
        }
    }

    update() {
        super.update();
        if (!this.onGround) {
            this.velocity.y += this.fallingFactor;
        } else {
            this.velocity.y = 0;
        }

        // Update position
        this.transform.position.x += this.velocity.x;
        this.transform.position.y += this.velocity.y;
    }

    // String
    toString = (): string => {
        return `Rigidbody of ${this.entity.name}`;
    };
}
