import { Entity } from "../core/entity.js";
import { Vector2 } from "../core/math/vector2.js";
import { Settings } from "../core/settings/settings.js";
import { Transform } from "../core/components/transform.js";
import { RigidBody } from "../core/components/bodies/rigidbody.js";
import { Rect } from "../core/utils/rect.js";

export class RigidBox extends Entity {
    constructor() {
        super("rigid-box");
    }

    protected init() {
        const [width, height] = [
            Settings.main.TILE_SCALED * 1.9,
            Settings.main.TILE_SCALED * 2.3,
        ];
        this.components = [
            new RigidBody(
                this,
                new Rect(new Vector2(0, 50), new Vector2(width, height - 50))
            ),
        ];
    }

    public start() {
        this.getComponent<Transform>(Transform).position = new Vector2(800, 0);
    }
}
