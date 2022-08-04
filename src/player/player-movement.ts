import { Transform } from "../core/components/transform.js";
import { Component } from "../core/component.js";
import { Input } from "../core/input.js";
import { Key } from "../core/key.js";
import { Vector2 } from "../core/math/vector2.js";
import { AnimatedSpriteRenderer } from "../core/components/animated-sprite-renderer.js";

export class PlayerMovement extends Component {
    private velocity: Vector2;
    private speed: number = 10;

    private transform: Transform;
    private spriteRenderer: AnimatedSpriteRenderer;

    start() {
        this.velocity = Vector2.ZERO;
        this.transform = this.entity.getComponent<Transform>(Transform);
        this.spriteRenderer = this.entity.getComponent<AnimatedSpriteRenderer>(
            AnimatedSpriteRenderer
        );
    }

    update() {
        this.velocity.x = 0;

        this.spriteRenderer.flipH = false;

        if (Input.isPressed(Key.D)) {
            this.velocity.x = 1;
            this.spriteRenderer.flipH = true;
        }
        if (Input.isPressed(Key.A)) {
            this.velocity.x = -1;
        }

        this.transform.position.x += this.velocity.x * this.speed;
        this.transform.position.y += this.velocity.y * this.speed;
    }
}
