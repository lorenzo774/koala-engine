"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimatedSpriteRenderer = void 0;
const vector2_js_1 = require("../../math/vector2.js");
const image_rect_js_1 = require("./image-rect.js");
const sprite_renderer_js_1 = require("./sprite-renderer.js");
class AnimatedSpriteRenderer extends sprite_renderer_js_1.SpriteRenderer {
    animations;
    animationsFrameCounter;
    curAnimation;
    timeElapsed;
    isPlaying;
    constructor(entity, imgRect = new image_rect_js_1.ImageRect(vector2_js_1.Vector2.ZERO, new vector2_js_1.Vector2(100, 100)), size = new vector2_js_1.Vector2(100, 100), offset = vector2_js_1.Vector2.ZERO, animations = []) {
        super(entity, null, false, imgRect, size, offset);
        this.animations = animations;
        this.timeElapsed = 0;
        if (animations.length === 0)
            return;
        this.setAnimationsFrameCounter();
        this.isPlaying = true;
        this.play(animations[0].name);
        this.stop();
    }
    setAnimationsFrameCounter() {
        this.animationsFrameCounter = new Map(this.animations.map((animation) => {
            return [animation.name, 0];
        }));
    }
    findAnimation(name) {
        return this.animations.find((animation) => animation.name === name);
    }
    getFrameCounter() {
        return this.animationsFrameCounter[this.curAnimation.name];
    }
    updateFrameCounter(value) {
        this.animationsFrameCounter[this.curAnimation.name] += value;
    }
    setFrameCounter(newValue) {
        this.animationsFrameCounter[this.curAnimation.name] = newValue;
    }
    changeFrame() {
        this.updateFrameCounter(this.isPlaying ? 1 : 0);
        if (this.getFrameCounter() > this.curAnimation.spriteSheet.frames - 1) {
            if (this.curAnimation.loop)
                this.setFrameCounter(0);
            else {
                this.setFrameCounter(0);
                return;
            }
        }
        this.imgRect.position.x = this.imgRect.size.x * this.getFrameCounter();
        this.timeElapsed = 0;
    }
    play(name) {
        const animationFound = this.findAnimation(name);
        if (!animationFound)
            return;
        if (JSON.stringify(animationFound) === JSON.stringify(this.curAnimation))
            return;
        this.curAnimation = animationFound;
        this.imgRect.position.x = 0;
        this.texture = this.curAnimation.spriteSheet.texture;
        this.timeElapsed = 0;
        this.isPlaying = true;
        this.setFrameCounter(0);
    }
    stop() {
        if (!this.curAnimation)
            return;
        this.timeElapsed = 0;
        this.setFrameCounter(0);
        this.isPlaying = false;
    }
    pause() {
        if (!this.curAnimation)
            return;
        this.timeElapsed = 0;
        this.isPlaying = false;
    }
    update() {
        if (this.animations.length === 0)
            return;
        if (!this.curAnimation)
            return;
        if (this.timeElapsed > this.curAnimation.speedFactor) {
            this.changeFrame();
        }
        this.timeElapsed += 1;
    }
}
exports.AnimatedSpriteRenderer = AnimatedSpriteRenderer;
