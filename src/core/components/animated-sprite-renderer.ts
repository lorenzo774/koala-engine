import { Vector2 } from "../../math/vector2.js";
import { Animation } from "../animation.js";
import { Entity } from "../entity.js";
import { ImageRect } from "../image-rect.js";
import { SpriteRenderer } from "./sprite-renderer.js";

export class AnimatedSpriteRenderer extends SpriteRenderer {
    private curAnimation: Animation;
    private frameCounter: number;
    private timeElapsed: number;

    /**
     * SpriteRenderer constructor with animations
     */
    constructor(
        entity: Entity,
        imgRect: ImageRect,
        size: Vector2,
        offset: Vector2 = Vector2.ZERO,
        public animations: Animation[] = []
    ) {
        super(entity, null, imgRect, size, offset);
        this.frameCounter = 0;
        this.timeElapsed = 0;

        if (animations.length === 0) return;
        this.curAnimation = animations[0];
        this.texture = this.curAnimation.spriteSheet.texture;
    }

    private findAnimation(name: string): Animation | null {
        return this.animations.find((animation) => animation.name === name);
    }

    private changeFrame() {
        this.frameCounter += 1;
        if (this.frameCounter >= this.curAnimation.spriteSheet.frames) {
            this.frameCounter = 0;
        }
        this.imgRect.position.x = this.imgRect.size.x * this.frameCounter;
        this.timeElapsed = 0;
    }

    /**
     * @param name Name of the animation
     */
    play(name: string) {
        const animationFound = this.findAnimation(name);
        if (!animationFound) return;

        this.curAnimation = animationFound;
        this.texture = this.curAnimation.spriteSheet.texture;
        this.timeElapsed = 0;
        this.frameCounter = 0;
    }

    update() {
        if (this.animations.length === 0) return;

        if (!this.curAnimation) return;

        if (this.timeElapsed > this.curAnimation.speedFactor) {
            this.changeFrame();
        }

        this.timeElapsed += 1;
    }

    draw(ctx: CanvasRenderingContext2D) {
        super.draw(ctx);
    }
}
