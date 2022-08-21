import { Vector2 } from "../../math/vector2.js";
import { Rect } from "../../utils/rect.js";
import { TilemapNode } from "./tilemap-node.js";

export class TilemapNodePool {
    private nodes: TilemapNode[];

    constructor() {
        this.nodes = new Array<TilemapNode>();
    }

    public addNode(position: Vector2) {
        this.nodes.push(new TilemapNode(position));
    }

    /**
     * @returns Rect with position and size of the pool (Tilemap UNITS)
     */
    public getRect(): Rect {
        const position: Vector2 = this.nodes[0].position; // Position in tilemap units

        let maxX: number = -1;
        let maxY: number = -1;
        for (const node of this.nodes) {
            if (node.position.x > maxX) {
                maxX = node.position.x;
            }
            if (node.position.y > maxY) {
                maxY = node.position.y;
            }
        }

        let size: Vector2 = new Vector2(
            maxX - this.nodes[0].position.x + 1,
            maxY - this.nodes[0].position.y + 1
        ); // Size in tilemap units

        return new Rect(position, size);
    }
}
