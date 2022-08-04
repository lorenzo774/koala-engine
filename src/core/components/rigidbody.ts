import { Settings } from "../../settings.js";
import { CollisionBox } from "../collision-box.js";
import { Component } from "../component.js";
import { Entity } from "../entity.js";
import { Vector2 } from "../math/vector2.js";
import { Transform } from "./transform.js";

export class RigidBody extends Component {
    private transform: Transform;
    private fallingFactor: number;
    private velocity: Vector2;

    constructor(
        entity: Entity,
        private collisionBox: CollisionBox = new CollisionBox(
            Vector2.ZERO,
            new Vector2(100, 100)
        ),
        private mass: number = 1
    ) {
        super(entity);
    }

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

    debugDraw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = "rgba(255, 0, 0, 0.4)";
        ctx.fillRect(
            this.transform.position.x + this.collisionBox.offset.x,
            this.transform.position.y + this.collisionBox.offset.y,
            this.collisionBox.size.x,
            this.collisionBox.size.y
        );
    }
}
