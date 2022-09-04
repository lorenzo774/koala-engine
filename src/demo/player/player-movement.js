"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerMovement = void 0;
const component_js_1 = require("../../core/component.js");
const keyboard_input_js_1 = require("../../core/input/keyboard-input.js");
const key_js_1 = require("../../core/input/key.js");
const animated_sprite_renderer_js_1 = require("../../core/components/sprite/animated-sprite-renderer.js");
const rigidbody_js_1 = require("../../core/components/bodies/rigidbody.js");
const audio_manager_js_1 = require("../../core/audio/audio-manager.js");
class PlayerMovement extends component_js_1.Component {
    speed = 500;
    jumpingSpeed = 500;
    animationRenderer;
    rigidBody;
    jump() {
        this.rigidBody.velocity.y = -this.jumpingSpeed;
        this.animationRenderer.play("jump");
        audio_manager_js_1.AudioManager.play("jump");
        audio_manager_js_1.AudioManager.pause("walk");
    }
    walk() {
        this.animationRenderer.play("run");
        audio_manager_js_1.AudioManager.play("walk");
    }
    idle() {
        this.animationRenderer.play("idle");
        audio_manager_js_1.AudioManager.pause("walk");
    }
    falling() {
        audio_manager_js_1.AudioManager.pause("idle");
        audio_manager_js_1.AudioManager.pause("walk");
    }
    start() {
        this.animationRenderer =
            this.entity.getComponent(animated_sprite_renderer_js_1.AnimatedSpriteRenderer);
        this.rigidBody = this.entity.getComponent(rigidbody_js_1.RigidBody);
    }
    update() {
        this.rigidBody.velocity.x = 0;
        if (keyboard_input_js_1.Keyboard.isPressed(key_js_1.Key.D)) {
            this.rigidBody.velocity.x = this.speed;
            this.animationRenderer.flipH = true;
        }
        if (keyboard_input_js_1.Keyboard.isPressed(key_js_1.Key.A)) {
            this.rigidBody.velocity.x = this.speed * -1;
            this.animationRenderer.flipH = false;
        }
    }
    physicsUpdate() {
        if (this.rigidBody.velocity.x === 0 &&
            this.rigidBody.velocity.y === 0 &&
            this.rigidBody.onGround) {
            this.idle();
        }
        if (this.rigidBody.velocity.x !== 0 && this.rigidBody.onGround) {
            this.walk();
        }
        if (this.rigidBody.velocity.x !== 0 && !this.rigidBody.onGround) {
            this.falling();
        }
        if (keyboard_input_js_1.Keyboard.justPressed(key_js_1.Key.SPACE) && this.rigidBody.onGround) {
            this.jump();
        }
    }
}
exports.PlayerMovement = PlayerMovement;
