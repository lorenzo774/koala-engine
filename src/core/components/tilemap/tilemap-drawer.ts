import { Settings } from "../../settings/settings.js";
import { Vector2 } from "../../math/vector2.js";
import { TilemapBody } from "../bodies/tilemapbody.js";
import { Camera } from "../camera.js";
import { Tilemap } from "./tilemap.js";

export class TilemapDrawer {
    constructor(private tilemap: Tilemap) {}

    // Draw single tile
    private drawTile(
        ctx: CanvasRenderingContext2D,
        tile: number,
        tilePos: Vector2
    ) {
        const rectPos: Vector2 = new Vector2(
            tile % this.tilemap.tileset.columns,
            Math.floor(tile / this.tilemap.tileset.columns)
        );
        ctx.drawImage(
            this.tilemap.tileset.texture,
            this.tilemap.tileset.tileSize.x * rectPos.x,
            this.tilemap.tileset.tileSize.y * rectPos.y,
            this.tilemap.tileset.tileSize.x - 0.1,
            this.tilemap.tileset.tileSize.y - 0.1,
            this.tilemap.tileset.worldSize.x  * tilePos.x -
                Camera.position.x,
            this.tilemap.tileset.worldSize.y  * tilePos.y -
                Camera.position.y,
            this.tilemap.tileset.worldSize.x,
            this.tilemap.tileset.worldSize.y
        );
    }

    private drawCollisions(
        ctx: CanvasRenderingContext2D,
        tilemapBody?: TilemapBody
    ) {
        if (!tilemapBody) return;

        for (const collision of tilemapBody.getCollisions()) {
            ctx.fillStyle = Settings.main.DEBUG_COLOR;
            ctx.fillRect(
                collision.position.x - Camera.position.x,
                collision.position.y - Camera.position.y,
                collision.size.x,
                collision.size.y
            );
        }
    }

    public draw(ctx: CanvasRenderingContext2D) {
        for (let i = 0; i < this.tilemap.map.length; i++) {
            for (let j = 0; j < this.tilemap.map[i].length; j++) {
                this.drawTile(ctx, this.tilemap.map[i][j], new Vector2(j, i));
            }
        }
    }

    public debugDraw(ctx: CanvasRenderingContext2D, tilemapBody?: TilemapBody) {
        // Draw rows
        for (let i = 0; i <= this.tilemap.map.length; i++) {
            ctx.beginPath();
            ctx.strokeStyle = Settings.main.DEBUG_COLOR;
            ctx.moveTo(
                0,
                i * this.tilemap.tileset.worldSize.y - Camera.position.y
            );
            ctx.lineTo(
                Settings.main.WIDTH,
                i * this.tilemap.tileset.worldSize.y  - Camera.position.y
            );
            ctx.stroke();
            ctx.closePath();
        }
        // Draw columns
        for (let i = 0; i <= this.tilemap.maxRowLength; i++) {
            ctx.beginPath();
            ctx.strokeStyle = Settings.main.DEBUG_COLOR;
            ctx.moveTo(
                i * this.tilemap.tileset.worldSize.x - Camera.position.x,
                0
            );
            ctx.lineTo(
                i * this.tilemap.tileset.worldSize.x   - Camera.position.x,
                Settings.main.HEIGHT
            );
            ctx.stroke();
            ctx.closePath();
        }
        // Draw collisions
        this.drawCollisions(ctx, tilemapBody);
    }
}
