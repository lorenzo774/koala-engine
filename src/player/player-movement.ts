import { Transform } from "../core/components/transform.js";
import { Component } from "../core/component.js";
import { Input } from "../core/input.js";
import { Key } from "../core/key.js";
import { Vector2 } from "../core/math/vector2.js";
import { AnimatedSpriteRenderer } from "../core/components/animated-sprite-renderer.js";
import { sleep } from "../core/utils/helper.js";
import { RigidBody } from "../core/components/rigidbody.js";

export class PlayerMovement extends Component {
    private velocity: Vector2;
    private speed: number = 10;
    private canJump: boolean = true;
    private jumping: boolean = false;
    private jumpingSpeed: number = 3.5;

    private transform: Transform;
    private spriteRenderer: AnimatedSpriteRenderer;
    private rigidBody: RigidBody;

    private async jump() {
        this.velocity.y = -this.jumpingSpeed;
        await sleep(55 * this.jumpingSpeed);
        this.jumping = false;
        this.canJump = true;
    }

    start() {
        this.velocity = Vector2.ZERO;
        this.transform = this.entity.getComponent<Transform>(Transform);
        this.spriteRenderer = this.entity.getComponent<AnimatedSpriteRenderer>(
            AnimatedSpriteRenderer
        );
        this.rigidBody = this.entity.getComponent<RigidBody>(RigidBody);
    }

    update() {
        this.velocity.x = 0;
        this.velocity.y = 0;

        if (Input.isPressed(Key.D)) {
            this.velocity.x = 1;
            this.spriteRenderer.flipH = true;
        }
        if (Input.isPressed(Key.A)) {
            this.velocity.x = -1;
            this.spriteRenderer.flipH = false;
        }

        if (
            Input.justPressed(Key.SPACE) &&
            this.canJump &&
            this.rigidBody.onGround
        ) {
            this.canJump = false;
            this.jumping = true;
        }
        if (this.jumping) {
            this.jump();
        }

        this.transform.position.x += this.velocity.x * this.speed;
        this.transform.position.y += this.velocity.y * this.speed;
    }
}
