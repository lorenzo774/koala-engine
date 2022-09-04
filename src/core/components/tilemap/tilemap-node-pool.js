"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TilemapNodePool = void 0;
const vector2_js_1 = require("../../math/vector2.js");
const rect_js_1 = require("../../utils/rect.js");
const tilemap_node_js_1 = require("./tilemap-node.js");
class TilemapNodePool {
    nodes;
    constructor() {
        this.nodes = new Array();
        this.addRow();
    }
    addRow() {
        this.nodes.push(new Array());
    }
    addNode(position) {
        this.nodes[this.nodes.length - 1].push(new tilemap_node_js_1.TilemapNode(position));
    }
    getRect() {
        let position = this.nodes[0][0].position;
        let maxX = -1;
        let maxY = -1;
        let minRowLength = Infinity;
        for (const row of this.nodes) {
            if (row.length < minRowLength) {
                minRowLength = row.length;
                maxX = row[row.length - 1].position.x;
            }
            if (row[row.length - 1].position.y > maxY) {
                maxY = row[row.length - 1].position.y;
            }
        }
        let size = new vector2_js_1.Vector2(maxX - position.x + 1, maxY - position.y + 1);
        return new rect_js_1.Rect(position, size);
    }
}
exports.TilemapNodePool = TilemapNodePool;
