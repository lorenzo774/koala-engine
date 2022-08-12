import { Tilemap } from "../../core/components/tilemap.js";
import { Entity } from "../../core/entity.js";
import { Vector2 } from "../../core/math/vector2.js";
import { Tileset } from "../../core/tileset.js";
import { loadImage } from "../../core/utils/helper.js";
import { Settings } from "../../settings.js";

export class World extends Entity {
    constructor() {
        super("world");
    }

    protected init() {
        this.components = [
            new Tilemap(
                this,
                new Tileset(
                    loadImage("./assets/BGandTiles/Grass.png"),
                    new Vector2(16, 16),
                    new Vector2(Settings.TILE_SCALED, Settings.TILE_SCALED)
                ),
                Settings.WORLD
            ),
        ];
    }
}
