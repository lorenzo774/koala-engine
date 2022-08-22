import { Vector2 } from "../../math/vector2.js";
import { Component } from "../../component.js";
import { Entity } from "../../entity.js";
import { ImageRect } from "./image-rect.js";
import { Transform } from "../transform.js";
import { Camera } from "../camera.js";

export class SpriteRenderer extends Component {
    private transform: Transform;
    /**
     * Flip texture horizontally
     */
    public flipH: boolean = false;

    constructor(
        entity: Entity,
        public texture: HTMLImageElement | null = null,
        /**
         * Sprite position fixed on the screen
         */
        public fixedPosition: boolean = false,
        /**
         * Rendering a rect inside image source
         */
        protected imgRect: ImageRect = new ImageRect(
            Vector2.ZERO,
            new Vector2(texture.width, texture.height)
        ),
        private size: Vector2 = new Vector2(texture.width, texture.height),
        /**
         * Offset from transform position
         */
        private offset: Vector2 = Vector2.ZERO
    ) {
        super(entity);
        this.transform = entity.getComponent<Transform>(Transform);
    }

    private drawHorizontalFlip(ctx: CanvasRenderingContext2D) {
        ctx.translate(this.transform.position.x + this.size.x, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(
            this.texture,
            this.imgRect.position.x,
            this.imgRect.position.y ,
            this.imgRect.size.x - 0.1,
            this.imgRect.size.y - 0.1,
            Camera.main.position.x,
            this.transform.position.y + this.offset.y - Camera.main.position.y,
            this.size.x,
            this.size.y
        );
        ctx.setTransform(1, 0, 0, 1, 0, 0);
    }

    public start() {}

    public update() {}

    public draw(ctx: CanvasRenderingContext2D) {
        if (!this.texture) return;

        if (this.flipH) {
            this.drawHorizontalFlip(ctx);
        } else {
            ctx.drawImage(
                this.texture,
                this.imgRect.position.x,
                this.imgRect.position.y,
                this.imgRect.size.x,
                this.imgRect.size.y,
                this.transform.position.x +
                    this.offset.x -
                    (this.fixedPosition ? 0 : Camera.main.position.x),
                this.transform.position.y -
                    this.offset.y -
                    (this.fixedPosition ? 0 : Camera.main.position.y),
                this.size.x,
                this.size.y
            );
        }
    }
}
