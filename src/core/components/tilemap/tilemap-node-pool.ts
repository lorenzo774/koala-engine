import { Vector2 } from "../../math/vector2.js";
import { Rect } from "../../utils/rect.js";
import { TilemapNode } from "./tilemap-node.js";

export class TilemapNodePool {
    private nodes: TilemapNode[][];

    constructor() {
        this.nodes = new Array<Array<TilemapNode>>();
        this.addRow();
    }

    public addRow() {
        this.nodes.push(new Array<TilemapNode>());
    }

    public addNode(position: Vector2) {
        this.nodes[this.nodes.length - 1].push(new TilemapNode(position));
    }

    /**
     * @returns Rect with position and size of the pool (Tilemap UNITS)
     */
    public getRect(): Rect {
        const position: Vector2 = this.nodes[0][0].position; // Position in tilemap units

        let maxX: number = -1;
        let maxY: number = -1;
        let minRowLength: number = Infinity;

        for (const row of this.nodes) {
            if(row.length < minRowLength) {
                minRowLength = row.length;
                maxX = row[row.length - 1].position.x;
            }
            if(row[row.length - 1].position.y > maxY) {
                maxY = row[row.length - 1].position.y;
            }
        }

        let size: Vector2 = new Vector2(
            maxX - position.x + 1,
            maxY - position.y + 1
        ); // Size in tilemap units

        return new Rect(position, size);
    }
}
