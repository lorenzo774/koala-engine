import { Component } from "../../core/component.js";
import { Keyboard } from "../../core/input/keyboard-input.js";
import { Key } from "../../core/input/key.js";
import { AnimatedSpriteRenderer } from "../../core/components/sprite/animated-sprite-renderer.js";
import { RigidBody } from "../../core/components/bodies/rigidbody.js";

export class PlayerMovement extends Component {
    private speed: number = 500;
    private canJump: boolean = true;
    private jumpingSpeed: number = 500;

    private spriteRenderer: AnimatedSpriteRenderer;
    private rigidBody: RigidBody;

    private async jump() {
        this.rigidBody.velocity.y = -this.jumpingSpeed;
        this.spriteRenderer.play("jump");
    }

    public start() {
        this.spriteRenderer = this.entity.getComponent<AnimatedSpriteRenderer>(
            AnimatedSpriteRenderer
        );
        this.rigidBody = this.entity.getComponent<RigidBody>(RigidBody);
    }

    public update() {
        this.rigidBody.velocity.x = 0;

        if (Keyboard.isPressed(Key.D)) {
            this.rigidBody.velocity.x = 1 * this.speed;
            this.spriteRenderer.flipH = true;
        }
        if (Keyboard.isPressed(Key.A)) {
            this.rigidBody.velocity.x = -1 * this.speed;
            this.spriteRenderer.flipH = false;
        }

        if (
            this.rigidBody.velocity.x === 0 &&
            this.rigidBody.velocity.y === 0 &&
            this.rigidBody.onGround
        ) {
            this.spriteRenderer.play("idle");
        }
        if (this.rigidBody.velocity.x !== 0 && this.rigidBody.onGround) {
            this.spriteRenderer.play("run");
        }

        if (Keyboard.justPressed(Key.SPACE) && this.rigidBody.onGround) {
            this.jump();
        }
    }
}
