import { CollisionBox } from "../core/collision-box.js";
import { StaticBody } from "../core/components/staticbody.js";
import { Transform } from "../core/components/transform.js";
import { Entity } from "../core/entity.js";
import { Vector2 } from "../core/math/vector2.js";

export class AnotherBox extends Entity {
    constructor() {
        super("anotherbox");
    }

    protected init() {
        this.components = [
            new StaticBody(
                this,
                new CollisionBox(Vector2.ZERO, new Vector2(100, 100))
            ),
        ];
    }

    start() {
        this.getComponent<Transform>(Transform).position = new Vector2(
            900,
            700
        );
    }
}
