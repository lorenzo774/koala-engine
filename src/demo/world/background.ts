import { SpriteRenderer } from "../../core/components/sprite/sprite-renderer.js";
import { Entity } from "../../core/entity.js";
import { ImageRect } from "../../core/components/sprite/image-rect.js";
import { Vector2 } from "../../core/math/vector2.js";
import { loadImage } from "../../core/utils/helper.js";
import { Settings } from "../../core/settings/settings.js";

export class Background extends Entity {
    constructor() {
        super("background");
    }

    // Background is not responsive
    protected init() {
          this.components = [
            new SpriteRenderer(
                this,
                loadImage("../assets/BGandTiles/BG-export.png"),
                true,
                new ImageRect(Vector2.ZERO, new Vector2(400, 304)),
                Settings.main.SCREEN_SIZE
            ),
        ];
    }
}
