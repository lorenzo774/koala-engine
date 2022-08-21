import { Component } from "../../component.js";
import { Entity } from "../../entity.js";
import { Rect } from "../../utils/rect.js";
import { TilemapBody } from "../bodies/tilemapbody.js";
import { TilemapDrawer } from "./tilemap-drawer.js";
import { Tileset } from "./tileset.js";
import { TilemapRectsFinder } from "./tilemap-rects-finder.js";

export class Tilemap extends Component {
    private tilemapDrawer: TilemapDrawer;
    public maxRowLength: number;

    constructor(
        entity: Entity,
        public tileset: Tileset = null,
        public map: number[][] = new Array<Array<number>>()
    ) {
        super(entity);
        this.maxRowLength = this.getMaxLength();
        this.tilemapDrawer = new TilemapDrawer(this);
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

    /**
     * @returns Individual rects in a tilemap with an algorithm
     */
    public getIndividualRects(): Rect[] {
        return new TilemapRectsFinder(this).find();
    }

    public draw(ctx: CanvasRenderingContext2D) {
        this.tilemapDrawer.draw(ctx);
    }

    public debugDraw(ctx: CanvasRenderingContext2D) {
        this.tilemapDrawer.debugDraw(
            ctx,
            this.entity.getBody<TilemapBody>(TilemapBody)
        );
    }
}
