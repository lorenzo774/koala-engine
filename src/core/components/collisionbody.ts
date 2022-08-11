import { CollisionBox } from "../collision-box.js";
import { Component } from "../component.js";
import { Entity } from "../entity.js";
import { Vector2 } from "../math/vector2.js";
import { Transform } from "./transform.js";

export abstract class CollisionBody extends Component {
    protected transform: Transform;
    public position: Vector2;

    constructor(
        entity: Entity,
        public collisionBox: CollisionBox = new CollisionBox(
            Vector2.ZERO,
            new Vector2(100, 100)
        )
    ) {
        super(entity);
        this.transform = entity.getComponent<Transform>(Transform);
    }

    start() {
        this.position = Vector2.ZERO;
        this.position.x = this.transform.position.x;
        this.position.y = this.transform.position.y;
    }

    /**
     * Called when the body is in collision with another
     */
    onCollision() {}

    update() {
        this.position.x =
            this.transform.position.x + this.collisionBox.offset.x;
        this.position.y =
            this.transform.position.y + this.collisionBox.offset.y;
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
