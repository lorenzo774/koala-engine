"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RigidBody = void 0;
const settings_js_1 = require("../../settings/settings.js");
const vector2_js_1 = require("../../math/vector2.js");
const collisionbody_js_1 = require("./collisionbody.js");
const rect_js_1 = require("../../utils/rect.js");
const camera_js_1 = require("../camera.js");
class RigidBody extends collisionbody_js_1.CollisionBody {
    collisionBox;
    gravity;
    mass;
    fallingFactor;
    velocity = vector2_js_1.Vector2.ZERO;
    lastContactNormal = vector2_js_1.Vector2.ZERO;
    get onGround() {
        return this.lastContactNormal.y === -1;
    }
    constructor(entity, collisionBox = new rect_js_1.Rect(vector2_js_1.Vector2.ZERO, new vector2_js_1.Vector2(100, 100)), gravity = true, mass = 1) {
        super(entity);
        this.collisionBox = collisionBox;
        this.gravity = gravity;
        this.mass = mass;
    }
    start() {
        this.fallingFactor = this.gravity ? settings_js_1.Settings.main.GRAVITY * this.mass : 0;
        this.velocity = vector2_js_1.Vector2.ZERO;
    }
    *getCollisions() {
        yield new rect_js_1.Rect(vector2_js_1.Vector2.add(this.transform.position, this.collisionBox.position), this.collisionBox.size, this.velocity);
    }
    update() {
        this.velocity.y += this.fallingFactor * (1 / settings_js_1.Settings.main.PHYSICS_CYCLES_PER_SECONDS);
    }
    physicsUpdate() {
        this.transform.position.x +=
            this.velocity.x * (1 / settings_js_1.Settings.main.PHYSICS_CYCLES_PER_SECONDS);
        this.transform.position.y +=
            this.velocity.y * (1 / settings_js_1.Settings.main.PHYSICS_CYCLES_PER_SECONDS);
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
        return `Rigidbody of ${this.entity.name}`;
    };
}
exports.RigidBody = RigidBody;
