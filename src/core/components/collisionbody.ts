import { CollisionBox } from "../collision-box.js";
import { Component } from "../component.js";
import { Entity } from "../entity.js";
import { Vector2 } from "../math/vector2.js";
import { Transform } from "./transform.js";

export abstract class CollisionBody extends Component {
    public position: Vector2;
    protected transform: Transform;

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

    protected onCollision() {}

    checkCollision(otherCollisionBody: CollisionBody) {
        if (
            // Check Y
            this.position.y + this.collisionBox.size.y >
                otherCollisionBody.position.y &&
            this.position.y <
                otherCollisionBody.position.y +
                    otherCollisionBody.collisionBox.size.y &&
            // Check X
            this.position.x + this.collisionBox.size.x >
                otherCollisionBody.position.x &&
            this.position.x <
                otherCollisionBody.position.x +
                    otherCollisionBody.collisionBox.size.x
        ) {
            this.onCollision();
        }
    }

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
