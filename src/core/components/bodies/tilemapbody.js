"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TilemapBody = void 0;
const collisionbody_js_1 = require("./collisionbody.js");
const tilemap_js_1 = require("../tilemap/tilemap.js");
const rect_js_1 = require("../../utils/rect.js");
const vector2_js_1 = require("../../math/vector2.js");
class TilemapBody extends collisionbody_js_1.CollisionBody {
    tilemap;
    collisions;
    constructor(entity, solid = true, tilemap = new tilemap_js_1.Tilemap(entity)) {
        super(entity, solid);
        this.tilemap = tilemap;
        this.collisions = this.tilemap
            .getIndividualRects()
            .map((rect) => new rect_js_1.Rect(vector2_js_1.Vector2.multiply(rect.position, vector2_js_1.Vector2.multiplyBy(tilemap.tileset.worldSize, 1)), vector2_js_1.Vector2.multiplyBy(vector2_js_1.Vector2.multiply(rect.size, tilemap.tileset.worldSize), 1)));
    }
    *getCollisions() {
        for (const rect of this.collisions) {
            yield rect;
        }
    }
    toString = () => {
        return `TilemapBody of ${this.entity.name}`;
    };
}
exports.TilemapBody = TilemapBody;
