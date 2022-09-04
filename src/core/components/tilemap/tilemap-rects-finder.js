"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TilemapRectsFinder = void 0;
const rect_js_1 = require("../../utils/rect.js");
const swept_functions_js_1 = require("../../physics/swept-functions.js");
const vector2_js_1 = require("../../math/vector2.js");
const tilemap_node_pool_js_1 = require("./tilemap-node-pool.js");
class TilemapRectsFinder {
    tilemap;
    constructor(tilemap) {
        this.tilemap = tilemap;
    }
    find() {
        let rects = new Array();
        for (let i = 0; i < this.tilemap.map[0].length; i += 1) {
            for (let j = 0; j < this.tilemap.map.length; j += 1) {
                let collision = false;
                for (const rect of rects) {
                    if ((0, swept_functions_js_1.rectVsRect)(new rect_js_1.Rect(new vector2_js_1.Vector2(i, j), vector2_js_1.Vector2.ONE), rect)) {
                        collision = true;
                    }
                }
                if (collision) {
                    continue;
                }
                if (this.tilemap.map[j][i] !== -1) {
                    const nodePool = this.getNodePool(new vector2_js_1.Vector2(i, j), rects);
                    const rect = nodePool.getRect();
                    rects.push(rect);
                }
            }
        }
        return rects;
    }
    getNodePool(startPos, rects) {
        let yCount = 0;
        let nodePool = new tilemap_node_pool_js_1.TilemapNodePool();
        for (let i = startPos.x; i < this.tilemap.map[0].length; i += 1) {
            const tile = this.tilemap.map[startPos.y + yCount][i];
            if (tile === -1) {
                i = startPos.x;
                yCount += 1;
                if (startPos.y + yCount >= this.tilemap.map.length) {
                    return nodePool;
                }
                let collision = false;
                for (const rect of rects) {
                    if ((0, swept_functions_js_1.rectVsRect)(new rect_js_1.Rect(new vector2_js_1.Vector2(i, startPos.y + yCount), vector2_js_1.Vector2.ONE), rect)) {
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
            nodePool.addNode(new vector2_js_1.Vector2(i, startPos.y + yCount));
        }
        return nodePool;
    }
}
exports.TilemapRectsFinder = TilemapRectsFinder;
