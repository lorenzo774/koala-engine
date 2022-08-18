import { Vector2 } from "../../math/vector2.js";
import { Animation } from "./animation.js";
import { Entity } from "../../entity.js";
import { ImageRect } from "./image-rect.js";
import { SpriteRenderer } from "./sprite-renderer.js";

export class AnimatedSpriteRenderer extends SpriteRenderer {
    /**
     * Save frameCounter of every animation
     */
    private animationsFrameCounter: Map<string, number>;
    private curAnimation: Animation;
    private timeElapsed: number;
    private isPlaying: boolean;

    /**
     * SpriteRenderer constructor with animations
     */
    constructor(
        entity: Entity,
        imgRect: ImageRect = new ImageRect(Vector2.ZERO, new Vector2(100, 100)),
        size: Vector2 = new Vector2(100, 100),
        offset: Vector2 = Vector2.ZERO,
        public animations: Animation[] = []
    ) {
        super(entity, null, imgRect, size, offset);
        this.timeElapsed = 0;

        if (animations.length === 0) return;

        this.setAnimationsFrameCounter();
        this.isPlaying = true;
        this.play(animations[0].name);
        this.stop();
    }

    private setAnimationsFrameCounter() {
        this.animationsFrameCounter = new Map<string, number>(
            this.animations.map((animation: Animation) => {
                return [animation.name, 0];
            })
        );
    }

    private findAnimation(name: string): Animation | null {
        return this.animations.find((animation) => animation.name === name);
    }

    /*
        Frame counter methods
    */

    private getFrameCounter(): number {
        return this.animationsFrameCounter[this.curAnimation.name];
    }

    private updateFrameCounter(value: number) {
        this.animationsFrameCounter[this.curAnimation.name] += value;
    }

    private setFrameCounter(newValue: number) {
        this.animationsFrameCounter[this.curAnimation.name] = newValue;
    }

    /*
        Animations functionality
    */

    private changeFrame() {
        this.updateFrameCounter(this.isPlaying ? 1 : 0);
        if (this.getFrameCounter() > this.curAnimation.spriteSheet.frames - 1) {
            if (this.curAnimation.loop) this.setFrameCounter(0);
            else {
                this.setFrameCounter(0);
                return;
            }
        }
        this.imgRect.position.x = this.imgRect.size.x * this.getFrameCounter();
        this.timeElapsed = 0;
    }

    /**
     * @param name Name of the animation
     */
    public play(name: string) {
        const animationFound = this.findAnimation(name);
        if (!animationFound) return;
        if (
            JSON.stringify(animationFound) === JSON.stringify(this.curAnimation)
        )
            return;

        this.curAnimation = animationFound;
        this.imgRect.position.x = 0;
        this.texture = this.curAnimation.spriteSheet.texture;
        this.timeElapsed = 0;
        this.isPlaying = true;
        this.setFrameCounter(0);
    }

    /**
     * Stop current animation
     */
    public stop() {
        if (!this.curAnimation) return;

        this.timeElapsed = 0;
        this.setFrameCounter(0);
        this.isPlaying = false;
    }

    /**
     * pause current animation
     */
    public pause() {
        if (!this.curAnimation) return;

        this.timeElapsed = 0;
        this.isPlaying = false;
    }

    public update() {
        if (this.animations.length === 0) return;
        if (!this.curAnimation) return;

        if (this.timeElapsed > this.curAnimation.speedFactor) {
            this.changeFrame();
        }
        this.timeElapsed += 1;
    }
}
