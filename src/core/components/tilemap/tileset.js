"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tileset = void 0;
class Tileset {
    texture;
    tileSize;
    worldSize;
    columns;
    rows;
    constructor(texture, tileSize, worldSize) {
        this.texture = texture;
        this.tileSize = tileSize;
        this.worldSize = worldSize;
        this.columns = texture.width / this.tileSize.x;
        this.rows = texture.height / this.tileSize.y;
    }
}
exports.Tileset = Tileset;
