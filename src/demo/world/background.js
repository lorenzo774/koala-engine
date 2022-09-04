"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Background = void 0;
const sprite_renderer_js_1 = require("../../core/components/sprite/sprite-renderer.js");
const entity_js_1 = require("../../core/entity.js");
const image_rect_js_1 = require("../../core/components/sprite/image-rect.js");
const vector2_js_1 = require("../../core/math/vector2.js");
const helper_js_1 = require("../../core/utils/helper.js");
const settings_js_1 = require("../../core/settings/settings.js");
class Background extends entity_js_1.Entity {
    constructor() {
        super("background");
    }
    init() {
        this.components = [
            new sprite_renderer_js_1.SpriteRenderer(this, (0, helper_js_1.loadImage)("../assets/BGandTiles/BG-export.png"), true, new image_rect_js_1.ImageRect(vector2_js_1.Vector2.ZERO, new vector2_js_1.Vector2(400, 304)), settings_js_1.Settings.main.SCREEN_SIZE),
        ];
    }
}
exports.Background = Background;
