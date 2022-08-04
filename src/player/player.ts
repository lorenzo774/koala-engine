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

export class Player extends Entity {
    constructor() {
        super("player");
    }

    protected init() {
        this.components = [
            new AnimatedSpriteRenderer(
                this,
                new ImageRect(Vector2.ZERO, new Vector2(19, 23)),
                new Vector2(
                    Settings.TILE_SCALED * 1.9,
                    Settings.TILE_SCALED * 2.3
                ),
                Vector2.ZERO,
                this.loadAnimations()
            ),
            new PlayerMovement(this),
        ];
    }

    start() {
        this.getComponent<Transform>(Transform).position = new Vector2(
            1000,
            400
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
        ];
    }
}
