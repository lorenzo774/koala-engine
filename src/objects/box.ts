import { Entity } from "../core/entity.js";
import { Vector2 } from "../core/math/vector2.js";
import { StaticBody } from "../core/components/bodies/staticbody.js";
import { CollisionBox } from "../core/components/bodies/collision-box.js";
import { Settings } from "../settings.js";
import { Transform } from "../core/components/transform.js";

export class Box extends Entity {
    constructor() {
        super("box");
    }

    // Background is not responsive
    protected init() {
        this.components = [
            new StaticBody(
                this,
                new CollisionBox(
                    Vector2.ZERO,
                    new Vector2(Settings.TILE_SCALED * 4, Settings.TILE_SCALED)
                )
            ),
        ];
    }

    public start() {
        this.getComponent<Transform>(Transform).position = new Vector2(
            Settings.TILE_SCALED * 8,
            Settings.TILE_SCALED * 10
        );
    }
}
