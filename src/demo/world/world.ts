import { Tilemap } from "../../core/components/tilemap/tilemap.js";
import { Entity } from "../../core/entity.js";
import { Vector2 } from "../../core/math/vector2.js";
import { Tileset } from "../../core/components/tilemap/tileset.js";
import { loadImage } from "../../core/utils/helper.js";
import { Settings } from "../../settings.js";
import { TilemapBody } from "../../core/components/bodies/tilemapbody.js";

export class World extends Entity {
    constructor() {
        super("world");
    }

    private loadTilemap(texture: HTMLImageElement) {
        this.components = [
            new Tilemap(
                this,
                new Tileset(
                    texture,
                    new Vector2(16, 16),
                    new Vector2(Settings.TILE_SCALED, Settings.TILE_SCALED)
                ),
                Settings.WORLD
            ),
        ];
        const tilemap = this.getComponent<Tilemap>(Tilemap);
        this.components.push(new TilemapBody(this, tilemap));
        texture.removeEventListener("load", this.loadTilemap.bind(this));
    }

    protected init() {
        const img = loadImage("../assets/BGandTiles/Grass.png");
        img.addEventListener("load", this.loadTilemap.bind(this, img));
    }
}
