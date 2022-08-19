import { Settings } from "../../../settings.js";
import { Component } from "../../component.js";
import { Entity } from "../../entity.js";
import { Vector2 } from "../../math/vector2.js";
import { Camera } from "../camera.js";
import { Tileset } from "./tileset.js";

export class Tilemap extends Component {
    private maxColumnLength: number;

    constructor(
        entity: Entity,
        private tileset: Tileset = null,
        private map: number[][] = [[]]
    ) {
        super(entity);
        this.maxColumnLength = this.getMaxLength();
    }

    /**
     * @returns Max columns length in the tileset
     */
    private getMaxLength(): number {
        let maxLength = -1;
        for (let i = 0; i < this.map.length; i++) {
            if (this.map[i].length > maxLength) {
                maxLength = this.map[i].length;
            }
        }
        return maxLength;
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
            this.tileset.worldSize.x * tilePos.x - Camera.main.position.x,
            this.tileset.worldSize.y * tilePos.y - Camera.main.position.y,
            this.tileset.worldSize.x,
            this.tileset.worldSize.y
        );
    }

    public draw(ctx: CanvasRenderingContext2D) {
        for (let i = 0; i < this.map.length; i++) {
            for (let j = 0; j < this.map[i].length; j++) {
                this.drawTile(ctx, this.map[i][j], new Vector2(j, i));
            }
        }
    }

    public debugDraw(ctx: CanvasRenderingContext2D) {
        // Draw rows
        for (let i = 0; i <= this.map.length; i++) {
            ctx.beginPath();
            ctx.strokeStyle = Settings.DEBUG_COLOR;
            ctx.moveTo(
                0,
                i * this.tileset.worldSize.y - Camera.main.position.y
            );
            ctx.lineTo(
                Settings.WIDTH,
                i * this.tileset.worldSize.y - Camera.main.position.y
            );
            ctx.stroke();
            ctx.closePath();
        }
        // Draw columns
        for (let i = 0; i <= this.maxColumnLength; i++) {
            ctx.beginPath();
            ctx.strokeStyle = Settings.DEBUG_COLOR;
            ctx.moveTo(
                i * this.tileset.worldSize.x - Camera.main.position.x,
                0
            );
            ctx.lineTo(
                i * this.tileset.worldSize.x - Camera.main.position.x,
                Settings.HEIGHT
            );
            ctx.stroke();
            ctx.closePath();
        }
    }
}
