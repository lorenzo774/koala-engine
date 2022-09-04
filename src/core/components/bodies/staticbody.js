"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaticBody = void 0;
const vector2_js_1 = require("../../math/vector2.js");
const collisionbody_js_1 = require("./collisionbody.js");
const rect_js_1 = require("../../utils/rect.js");
const settings_js_1 = require("../../settings/settings.js");
const camera_js_1 = require("../camera.js");
class StaticBody extends collisionbody_js_1.CollisionBody {
    collisionBox;
    constructor(entity, collisionBox = new rect_js_1.Rect(vector2_js_1.Vector2.ZERO, new vector2_js_1.Vector2(100, 100)), solid = true) {
        super(entity, solid);
        this.collisionBox = collisionBox;
    }
    *getCollisions() {
        yield new rect_js_1.Rect(vector2_js_1.Vector2.add(this.transform.position, this.collisionBox.position), this.collisionBox.size);
    }
    update() {
        this.position.x =
            this.transform.position.x + this.collisionBox.position.x;
        this.position.y =
            this.transform.position.y + this.collisionBox.position.y;
    }
    debugDraw(ctx) {
        ctx.fillStyle = settings_js_1.Settings.main.DEBUG_COLOR;
        ctx.fillRect(this.transform.position.x +
            this.collisionBox.position.x -
            camera_js_1.Camera.position.x, this.transform.position.y +
            this.collisionBox.position.y -
            camera_js_1.Camera.position.y, this.collisionBox.size.x, this.collisionBox.size.y);
    }
    toString = () => {
        return `StaticBody of ${this.entity.name}`;
    };
}
exports.StaticBody = StaticBody;
