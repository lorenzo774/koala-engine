import { CollisionBox } from "../../core/collision-box.js";
import { StaticBody } from "../../core/components/staticbody.js";
import { Transform } from "../../core/components/transform.js";
import { Entity } from "../../core/entity.js";
import { Vector2 } from "../../core/math/vector2.js";
import { Settings } from "../../settings.js";

export class Box extends Entity {
    constructor() {
        super("box");
    }

    protected init() {
        this.components = [
            new StaticBody(
                this,
                new CollisionBox(
                    Vector2.ZERO,
                    new Vector2(Settings.TILE_SCALED, Settings.TILE_SCALED)
                )
            ),
        ];
    }

    start() {
        this.getComponent<Transform>(Transform).position = new Vector2(
            Settings.TILE_SCALED * 2,
            Settings.TILE_SCALED * 3
        );
    }
}
