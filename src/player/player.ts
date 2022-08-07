import { Animation } from "../core/animation.js";
import { AnimatedSpriteRenderer } from "../core/components/animated-sprite-renderer.js";
import { Entity } from "../core/entity.js";
import { ImageRect } from "../core/image-rect.js";
import { SpriteSheet } from "../core/sprite-sheet.js";
import { Vector2 } from "../core/math/vector2.js";
import { Settings } from "../settings.js";
import { loadImage } from "../core/utils/helper.js";
import { PlayerMovement } from "./player-movement.js";
import { Transform } from "../core/components/transform.js";
import { RigidBody } from "../core/components/rigidbody.js";
import { CollisionBox } from "../core/collision-box.js";

export class Player extends Entity {
    constructor() {
        super("player");
    }

    protected init() {
        const [width, height] = [
            Settings.TILE_SCALED * 1.9,
            Settings.TILE_SCALED * 2.3,
        ];
        this.components = [
            new AnimatedSpriteRenderer(
                this,
                new ImageRect(Vector2.ZERO, new Vector2(19, 23)),
                new Vector2(width, height),
                Vector2.ZERO,
                this.loadAnimations()
            ),
            new PlayerMovement(this),
            new RigidBody(
                this,
                new CollisionBox(
                    new Vector2(0, 50),
                    new Vector2(width, height - 50)
                )
            ),
        ];
    }

    start() {
        this.getComponent<Transform>(Transform).position = new Vector2(
            700,
            500
        );
    }

    private loadAnimations(): Animation[] {
        return [
            new Animation(
                new SpriteSheet(
                    loadImage("./assets/Player/Shroom-Sheet-Idle.png"),
                    2
                ),
                "idle",
                5
            ),
            new Animation(
                new SpriteSheet(
                    loadImage("./assets/Player/Shroom-Sheet-Run.png"),
                    4
                ),
                "run",
                20
            ),
            new Animation(
                new SpriteSheet(
                    loadImage("./assets/Player/Shroom-Sheet-Jump.png"),
                    9
                ),
                "jump",
                15
            ),
        ];
    }
}
