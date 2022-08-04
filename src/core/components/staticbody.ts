import { CollisionBox } from "../collision-box.js";
import { Component } from "../component.js";
import { Entity } from "../entity.js";
import { Vector2 } from "../math/vector2.js";
import { Transform } from "./transform.js";

export class StaticBody extends Component {
    private transform: Transform;

    constructor(
        entity: Entity,
        private collisionBox: CollisionBox = new CollisionBox(
            Vector2.ZERO,
            new Vector2(100, 100)
        )
    ) {
        super(entity);
    }

    start() {
        this.transform = this.entity.getComponent<Transform>(Transform);
    }

    update() {}

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
