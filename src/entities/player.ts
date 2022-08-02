import { Component } from "../core/component.js";
import { Entity } from "../core/entity.js";
import { Vector2 } from "../math/vector2.js";

export class Player extends Entity {
    constructor() {
        super("player", []);
        this.addComponent(new PlayerMovement(this));
    }
}

class PlayerMovement extends Component {
    velocity: Vector2;
    position: Vector2;

    constructor(entity: Entity) {
        super(entity);
        this.position = Vector2.ZERO();
        this.velocity = new Vector2(1, 0);
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = "green";
        ctx.fillRect(this.position.x, this.position.y, 200, 200);
    }

    update() {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }
}
