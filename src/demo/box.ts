import { Entity } from "../core/entity.js";
import { Vector2 } from "../core/math/vector2.js";
import { StaticBody } from "../core/components/bodies/staticbody.js";
import { Settings } from "../core/settings/settings.js";
import { Transform } from "../core/components/transform.js";
import { Rect } from "../core/utils/rect.js";

export class Box extends Entity {
    constructor() {
        super("box");
    }

    // Background is not responsive
    protected init() {
        this.components = [
            new StaticBody(
                this,
                new Rect(
                    Vector2.ZERO,
                    new Vector2(Settings.main.TILE_SCALED * 16, Settings.main.TILE_SCALED)
                )
            ),
        ];
    }

    public start() {
        this.getComponent<Transform>(Transform).position = new Vector2(
            Settings.main.TILE_SCALED * 8,
            Settings.main.TILE_SCALED * 10
        );
    }
}
