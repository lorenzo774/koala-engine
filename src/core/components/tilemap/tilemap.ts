import { Component } from "../../component.js";
import { Entity } from "../../entity.js";
import { Vector2 } from "../../math/vector2.js";
import { rectVsRect } from "../../physics/swept-functions.js";
import { Rect } from "../../utils/rect.js";
import { TilemapBody } from "../bodies/tilemapbody.js";
import { TilemapDrawer } from "./tilemap-drawer.js";
import { TilemapNodePool } from "./tilemap-node-pool.js";
import { Tileset } from "./tileset.js";

export class Tilemap extends Component {
    private tilemapDrawer: TilemapDrawer;
    public maxRowLength: number;

    constructor(
        entity: Entity,
        public tileset: Tileset = null,
        public map: number[][] = [[]]
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
     * Algorithm to get individual rects in the map
     * @returns Array of individual Rects
     */
    public getIndividualRects(): Rect[] {
        let rects = new Array<Rect>();

        for (let i = 0; i < this.map[0].length; i += 1) {
            for (let j = 0; j < this.map.length; j += 1) {
                // Check indexes collision with other rects
                let collision = false;
                for (const rect of rects) {
                    if (
                        rectVsRect(
                            new Rect(new Vector2(i, j), Vector2.ONE),
                            rect
                        )
                    ) {
                        collision = true;
                    }
                }
                if (collision) {
                    continue;
                }
                // Start finding node pool
                if (this.map[j][i] !== -1) {
                    const nodePool: TilemapNodePool = this.getNodePool(
                        new Vector2(i, j),
                        rects
                    );
                    const rect = nodePool.getRect();
                    rects.push(rect);
                }
            }
        }
        return rects;
    }

    /**
     * Algorithm used by getIndividualRects to find an array of nodes
     * @returns Array of node
     */
    private getNodePool(startPos: Vector2, rects: Rect[]): TilemapNodePool {
        let yCount = 0;
        let nodePool: TilemapNodePool = new TilemapNodePool();

        for (let i = startPos.x; i < this.map[0].length; i += 1) {
            const tile = this.map[startPos.y + yCount][i];

            if (tile === -1) {
                i = startPos.x;
                yCount += 1;
                if (startPos.y + yCount >= this.map.length) {
                    return nodePool;
                }

                // Check indexes collision with other rects
                let collision = false;
                for (const rect of rects) {
                    if (
                        rectVsRect(
                            new Rect(
                                new Vector2(i, startPos.y + yCount),
                                Vector2.ONE
                            ),
                            rect
                        )
                    ) {
                        collision = true;
                    }
                }
                if (collision) {
                    break;
                    console.log(collision);
                    continue;
                }

                if (this.map[startPos.y + yCount][i] === -1) {
                    return nodePool;
                }
            }

            nodePool.addNode(new Vector2(i, startPos.y + yCount));
        }

        return nodePool;
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
