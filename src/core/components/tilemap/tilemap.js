"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tilemap = void 0;
const component_js_1 = require("../../component.js");
const tilemapbody_js_1 = require("../bodies/tilemapbody.js");
const tilemap_drawer_js_1 = require("./tilemap-drawer.js");
const tilemap_rects_finder_js_1 = require("./tilemap-rects-finder.js");
class Tilemap extends component_js_1.Component {
    tileset;
    map;
    tilemapDrawer;
    maxRowLength;
    constructor(entity, tileset = null, map = new Array()) {
        super(entity);
        this.tileset = tileset;
        this.map = map;
        this.maxRowLength = this.getMaxLength();
        this.tilemapDrawer = new tilemap_drawer_js_1.TilemapDrawer(this);
    }
    getMaxLength() {
        let maxLength = -1;
        for (let i = 0; i < this.map.length; i++) {
            if (this.map[i].length > maxLength) {
                maxLength = this.map[i].length;
            }
        }
        return maxLength;
    }
    getIndividualRects() {
        return new tilemap_rects_finder_js_1.TilemapRectsFinder(this).find();
    }
    draw(ctx) {
        this.tilemapDrawer.draw(ctx);
    }
    debugDraw(ctx) {
        this.tilemapDrawer.debugDraw(ctx, this.entity.getBody(tilemapbody_js_1.TilemapBody));
    }
}
exports.Tilemap = Tilemap;
