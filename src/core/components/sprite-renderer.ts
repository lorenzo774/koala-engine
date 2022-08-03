import { Vector2 } from "../../math/vector2.js";
import { Component } from "../component.js";
import { Entity } from "../entity.js";
import { ImageRect } from "../image-rect.js";
import { Transform } from "./transform.js";

export class SpriteRenderer extends Component {
    private transform: Transform;

    constructor(
        entity: Entity,
        public texture: HTMLImageElement | null = null,
        /**
         * Rendering a rect inside image source
         */
        protected imgRect: ImageRect,
        private size: Vector2,
        /**
         * Offset from transform position
         */
        private offset: Vector2 = Vector2.ZERO
    ) {
        super(entity);
        this.transform = entity.getComponent<Transform>(Transform);
    }

    draw(ctx: CanvasRenderingContext2D) {
        if (!this.texture) return;

        ctx.drawImage(
            this.texture,
            this.imgRect.position.x,
            this.imgRect.position.y,
            this.imgRect.size.x,
            this.imgRect.size.y,
            this.transform.position.x + this.offset.x,
            this.transform.position.y + this.offset.y,
            this.size.x,
            this.size.y
        );
    }
}
