import { Vector2 } from "./math/vector2.js";

export class Tileset {
    public columns: number;
    public rows: number;

    constructor(
        public texture: HTMLImageElement,
        public tileSize: Vector2,
        public worldSize: Vector2
    ) {
        this.columns = texture.width / this.tileSize.x;
        this.rows = texture.height / this.tileSize.y;
    }
}
