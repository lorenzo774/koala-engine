import { CollisionBox } from "../core/collision-box.js";
import { StaticBody } from "../core/components/staticbody.js";
import { Transform } from "../core/components/transform.js";
import { Entity } from "../core/entity.js";
import { Vector2 } from "../core/math/vector2.js";

export class Box extends Entity {
    constructor() {
        super("box");
    }

    protected init() {
        this.components = [
            new StaticBody(
                this,
                new CollisionBox(Vector2.ZERO, new Vector2(1000, 100))
            ),
        ];
    }

    start() {
        this.getComponent<Transform>(Transform).position = new Vector2(
            250,
            800
        );
    }
}
