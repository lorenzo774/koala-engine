import { CollisionBox } from "../collision-box.js";
import { Entity } from "../entity.js";
import { Vector2 } from "../math/vector2.js";
import { CollisionBody } from "./collisionbody.js";

export class StaticBody extends CollisionBody {
    constructor(
        entity: Entity,
        collisionBox: CollisionBox = new CollisionBox(
            Vector2.ZERO,
            new Vector2(100, 100)
        )
    ) {
        super(entity, collisionBox);
    }

    protected onCollision() {
        console.log("COLLISION");
    }

    // String
    toString = (): string => {
        return `StaticBody of ${this.entity.name}`;
    };
}
