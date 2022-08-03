import { Component } from "../core/component.js";
import { Entity } from "../core/entity.js";
import { Vector2 } from "../math/vector2.js";

export class Player extends Entity {
    constructor() {
        super("player", []);
        this.addComponent(new PlayerMovement(this));
        this.addComponent(new SpriteRenderer(this));
    }
}

class PlayerMovement extends Component {
    position: Vector2;
    velocity: Vector2;

    constructor(entity: Entity) {
        super(entity);
        this.position = Vector2.ZERO;
        this.velocity = new Vector2(1, 0);
    }

    draw(ctx: CanvasRenderingContext2D) {}

    update() {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }
}

class SpriteRenderer extends Component {
    constructor(entity: Entity) {
        super(entity);
    }

    draw(ctx: CanvasRenderingContext2D) {
        const position =
            this.entity.getComponent<PlayerMovement>(PlayerMovement).position;
        ctx.fillStyle = "green";
        ctx.fillRect(position.x, position.y, 200, 200);
    }
}
