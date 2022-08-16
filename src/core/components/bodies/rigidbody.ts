import { Settings } from "../../../settings.js";
import { CollisionBox } from "./collision-box.js";
import { Entity } from "../../entity.js";
import { Vector2 } from "../../math/vector2.js";
import { CollisionBody } from "./collisionbody.js";

/**
 * Dyamic body, this body has a velocity and it moves
 */
export class RigidBody extends CollisionBody {
    private fallingFactor: number;
    public velocity: Vector2 = Vector2.ZERO;

    public onGround: boolean = false;
    public leftRightCollision: boolean = false;

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

    public onCollision() {}

    public start() {
        super.start();
        this.fallingFactor = Settings.GRAVITY * this.mass;
        this.velocity = Vector2.ZERO;
    }

    public update() {
        super.update();
        if (!this.onGround) {
            this.velocity.y +=
                this.fallingFactor * (1 / Settings.PHYSICS_CYCLES_PER_SECONDS);
        } else if (this.velocity.y > 0) {
            this.velocity.y = 0;
        }
    }

    public physicsUpdate() {
        // Update position
        this.transform.position.x +=
            this.velocity.x * (1 / Settings.PHYSICS_CYCLES_PER_SECONDS);
        this.transform.position.y +=
            this.velocity.y * (1 / Settings.PHYSICS_CYCLES_PER_SECONDS);
    }

    // String
    public toString = (): string => {
        return `Rigidbody of ${this.entity.name}`;
    };
}
