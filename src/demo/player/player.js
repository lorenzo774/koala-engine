"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
const animation_js_1 = require("../../core/components/sprite/animation.js");
const animated_sprite_renderer_js_1 = require("../../core/components/sprite/animated-sprite-renderer.js");
const entity_js_1 = require("../../core/entity.js");
const image_rect_js_1 = require("../../core/components/sprite/image-rect.js");
const sprite_sheet_js_1 = require("../../core/components/sprite/sprite-sheet.js");
const vector2_js_1 = require("../../core/math/vector2.js");
const settings_js_1 = require("../../core/settings/settings.js");
const helper_js_1 = require("../../core/utils/helper.js");
const player_movement_js_1 = require("./player-movement.js");
const transform_js_1 = require("../../core/components/transform.js");
const rigidbody_js_1 = require("../../core/components/bodies/rigidbody.js");
const camera_js_1 = require("../../core/components/camera.js");
const rect_js_1 = require("../../core/utils/rect.js");
const player_collision_js_1 = require("./player-collision.js");
class Player extends entity_js_1.Entity {
    constructor() {
        super("player");
    }
    init() {
        const [width, height] = [
            settings_js_1.Settings.main.TILE_SCALED * 1.9,
            settings_js_1.Settings.main.TILE_SCALED * 2.3
        ];
        const camera = new camera_js_1.Camera(this, this.getComponent(transform_js_1.Transform), new vector2_js_1.Vector2(0, 500));
        this.components = [
            camera,
            new animated_sprite_renderer_js_1.AnimatedSpriteRenderer(this, new image_rect_js_1.ImageRect(vector2_js_1.Vector2.ZERO, new vector2_js_1.Vector2(19, 23)), new vector2_js_1.Vector2(width, height), vector2_js_1.Vector2.ZERO, this.loadAnimations()),
            new player_movement_js_1.PlayerMovement(this),
            new rigidbody_js_1.RigidBody(this, new rect_js_1.Rect(new vector2_js_1.Vector2(0, 50), new vector2_js_1.Vector2(width, height - 50))),
            new player_collision_js_1.PlayerCollision(this)
        ];
        camera_js_1.Camera.main = camera;
    }
    loadAnimations() {
        return [
            new animation_js_1.Animation(new sprite_sheet_js_1.SpriteSheet((0, helper_js_1.loadImage)("../assets/Player/Shroom-Sheet-Idle.png"), 2), "idle", 3, true),
            new animation_js_1.Animation(new sprite_sheet_js_1.SpriteSheet((0, helper_js_1.loadImage)("../assets/Player/Shroom-Sheet-Run.png"), 4), "run", 3, true),
            new animation_js_1.Animation(new sprite_sheet_js_1.SpriteSheet((0, helper_js_1.loadImage)("../assets/Player/Shroom-Sheet-Jump.png"), 9), "jump", 2)
        ];
    }
    start() {
        this.getComponent(transform_js_1.Transform).position = new vector2_js_1.Vector2(700, 0);
    }
}
exports.Player = Player;
