import { Component } from "../component.js";
import { Entity } from "../entity.js";
import { Vector2 } from "../math/vector2.js";
import { Tileset } from "../tileset.js";
import { Transform } from "./transform.js";

export class Tilemap extends Component {
    private transform: Transform;

    constructor(
        entity: Entity,
        private tileset: Tileset = null,
        private map: number[][] = [[]]
    ) {
        super(entity);
        this.transform = entity.getComponent<Transform>(Transform);
    }

    // Draw single tile
    private drawTile(
        ctx: CanvasRenderingContext2D,
        tile: number,
        tilePos: Vector2
    ) {
        const rectPos: Vector2 = new Vector2(
            tile % this.tileset.columns,
            Math.floor(tile / this.tileset.columns)
        );
        ctx.drawImage(
            this.tileset.texture,
            this.tileset.tileSize.x * rectPos.x,
            this.tileset.tileSize.y * rectPos.y,
            this.tileset.tileSize.x,
            this.tileset.tileSize.y,
            this.tileset.worldSize.x * tilePos.x,
            this.tileset.worldSize.y * tilePos.y,
            this.tileset.worldSize.x,
            this.tileset.worldSize.y
        );
    }

    draw(ctx: CanvasRenderingContext2D) {
        this.map.forEach((row, i) =>
            row.forEach((tile, j) =>
                this.drawTile.call(this, ctx, tile, new Vector2(j, i))
            )
        );
    }
}
