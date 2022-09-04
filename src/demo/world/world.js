"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.World = void 0;
const tilemap_js_1 = require("../../core/components/tilemap/tilemap.js");
const entity_js_1 = require("../../core/entity.js");
const vector2_js_1 = require("../../core/math/vector2.js");
const tileset_js_1 = require("../../core/components/tilemap/tileset.js");
const helper_js_1 = require("../../core/utils/helper.js");
const settings_js_1 = require("../../core/settings/settings.js");
const tilemapbody_js_1 = require("../../core/components/bodies/tilemapbody.js");
class World extends entity_js_1.Entity {
    constructor() {
        super("world");
    }
    loadTilemap(texture) {
        this.components = [
            new tilemap_js_1.Tilemap(this, new tileset_js_1.Tileset(texture, new vector2_js_1.Vector2(16, 16), new vector2_js_1.Vector2(settings_js_1.Settings.main.TILE_SCALED, settings_js_1.Settings.main.TILE_SCALED)), settings_js_1.Settings.main.WORLD),
        ];
        const tilemap = this.getComponent(tilemap_js_1.Tilemap);
        this.components.push(new tilemapbody_js_1.TilemapBody(this, true, tilemap));
        texture.removeEventListener("load", this.loadTilemap.bind(this));
    }
    init() {
        const img = (0, helper_js_1.loadImage)("../assets/BGandTiles/Grass.png");
        img.addEventListener("load", this.loadTilemap.bind(this, img));
    }
}
exports.World = World;
