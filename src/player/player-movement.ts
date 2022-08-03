import { Transform } from "../core/components/transform.js";
import { Component } from "../core/component.js";
import { Entity } from "../core/entity";
import { Input } from "../core/input.js";
import { Key } from "../core/key.js";
import { Vector2 } from "../core/math/vector2.js";

export class PlayerMovement extends Component {
    private velocity: Vector2;
    private transform: Transform;
    private speed: number = 10;

    constructor(entity: Entity) {
        super(entity);
        this.velocity = Vector2.ZERO;
        this.transform = entity.getComponent<Transform>(Transform);
    }

    update() {
        this.velocity.x = 0;

        if (Input.isPressed(Key.D)) {
            this.velocity.x = 1;
        }
        if (Input.isPressed(Key.A)) {
            this.velocity.x = -1;
        }

        this.transform.position.x += this.velocity.x * this.speed;
        this.transform.position.y += this.velocity.y * this.speed;
    }
}
