import { Tilemap } from "./tilemap.js";
import { Rect } from "../../utils/rect.js";
import { rectVsRect } from "../../physics/swept-functions.js";
import { Vector2 } from "../../math/vector2.js";
import { TilemapNodePool } from "./tilemap-node-pool.js";

export class TilemapRectsFinder {
    constructor(private tilemap: Tilemap) {}

    /**
     * Algorithm to get individual rects in the map
     * @returns Array of individual Rects
     */
    public find(): Rect[] {
        let rects = new Array<Rect>();

        for (let i = 0; i < this.tilemap.map[0].length; i += 1) {
            for (let j = 0; j < this.tilemap.map.length; j += 1) {
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
                if (this.tilemap.map[j][i] !== -1) {
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

        for (let i = startPos.x; i < this.tilemap.map[0].length; i += 1) {
            const tile = this.tilemap.map[startPos.y + yCount][i];

            if (tile === -1) {
                i = startPos.x;
                yCount += 1;
                if (startPos.y + yCount >= this.tilemap.map.length) {
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
                }

                if (this.tilemap.map[startPos.y + yCount][i] === -1) {
                    return nodePool;
                }
                nodePool.addRow();
            }
            nodePool.addNode(new Vector2(i, startPos.y + yCount));
        }

        return nodePool;
    }
}
