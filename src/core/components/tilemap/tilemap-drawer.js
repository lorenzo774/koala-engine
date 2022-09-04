"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TilemapDrawer = void 0;
const settings_js_1 = require("../../settings/settings.js");
const vector2_js_1 = require("../../math/vector2.js");
const camera_js_1 = require("../camera.js");
class TilemapDrawer {
    tilemap;
    constructor(tilemap) {
        this.tilemap = tilemap;
    }
    drawTile(ctx, tile, tilePos) {
        const rectPos = new vector2_js_1.Vector2(tile % this.tilemap.tileset.columns, Math.floor(tile / this.tilemap.tileset.columns));
        ctx.drawImage(this.tilemap.tileset.texture, this.tilemap.tileset.tileSize.x * rectPos.x, this.tilemap.tileset.tileSize.y * rectPos.y, this.tilemap.tileset.tileSize.x - 0.1, this.tilemap.tileset.tileSize.y - 0.1, this.tilemap.tileset.worldSize.x * tilePos.x -
            camera_js_1.Camera.position.x, this.tilemap.tileset.worldSize.y * tilePos.y -
            camera_js_1.Camera.position.y, this.tilemap.tileset.worldSize.x, this.tilemap.tileset.worldSize.y);
    }
    drawCollisions(ctx, tilemapBody) {
        if (!tilemapBody)
            return;
        for (const collision of tilemapBody.getCollisions()) {
            ctx.fillStyle = settings_js_1.Settings.main.DEBUG_COLOR;
            ctx.fillRect(collision.position.x - camera_js_1.Camera.position.x, collision.position.y - camera_js_1.Camera.position.y, collision.size.x, collision.size.y);
        }
    }
    draw(ctx) {
        for (let i = 0; i < this.tilemap.map.length; i++) {
            for (let j = 0; j < this.tilemap.map[i].length; j++) {
                this.drawTile(ctx, this.tilemap.map[i][j], new vector2_js_1.Vector2(j, i));
            }
        }
    }
    debugDraw(ctx, tilemapBody) {
        for (let i = 0; i <= this.tilemap.map.length; i++) {
            ctx.beginPath();
            ctx.strokeStyle = settings_js_1.Settings.main.DEBUG_COLOR;
            ctx.moveTo(0, i * this.tilemap.tileset.worldSize.y - camera_js_1.Camera.position.y);
            ctx.lineTo(settings_js_1.Settings.main.WIDTH, i * this.tilemap.tileset.worldSize.y - camera_js_1.Camera.position.y);
            ctx.stroke();
            ctx.closePath();
        }
        for (let i = 0; i <= this.tilemap.maxRowLength; i++) {
            ctx.beginPath();
            ctx.strokeStyle = settings_js_1.Settings.main.DEBUG_COLOR;
            ctx.moveTo(i * this.tilemap.tileset.worldSize.x - camera_js_1.Camera.position.x, 0);
            ctx.lineTo(i * this.tilemap.tileset.worldSize.x - camera_js_1.Camera.position.x, settings_js_1.Settings.main.HEIGHT);
            ctx.stroke();
            ctx.closePath();
        }
        this.drawCollisions(ctx, tilemapBody);
    }
}
exports.TilemapDrawer = TilemapDrawer;
