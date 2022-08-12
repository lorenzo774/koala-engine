import { Component } from "../../core/component.js";
import { Input } from "../../core/systems/input-system.js";
import { Key } from "../../core/key.js";
import { AnimatedSpriteRenderer } from "../../core/components/animated-sprite-renderer.js";
import { RigidBody } from "../../core/components/rigidbody.js";
import { Vector2 } from "../../core/math/vector2.js";

export class PlayerMovement extends Component {
    private speed: number = 15;
    private canJump: boolean = true;
    private jumpingSpeed: number = 30;

    private spriteRenderer: AnimatedSpriteRenderer;
    private rigidBody: RigidBody;

    private async jump() {
        this.rigidBody.velocity.y = -this.jumpingSpeed;
        this.spriteRenderer.play("jump");
        this.canJump = false;
    }

    start() {
        this.spriteRenderer = this.entity.getComponent<AnimatedSpriteRenderer>(
            AnimatedSpriteRenderer
        );
        this.rigidBody = this.entity.getComponent<RigidBody>(RigidBody);
    }

    update() {
        this.rigidBody.velocity.x = 0;

        if (Input.isPressed(Key.D)) {
            this.rigidBody.velocity.x = 1 * this.speed;
            this.spriteRenderer.flipH = true;
        }
        if (Input.isPressed(Key.A)) {
            this.rigidBody.velocity.x = -1 * this.speed;
            this.spriteRenderer.flipH = false;
        }

        if (this.rigidBody.onGround) {
            this.canJump = true;
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

        if (Input.justPressed(Key.SPACE) && this.canJump) {
            this.jump();
        }

        this.rigidBody.move();
    }
}
