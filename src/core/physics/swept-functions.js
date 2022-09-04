"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dynamicRectVsRect = exports.rayVsRect = exports.rectVsRect = void 0;
const settings_js_1 = require("../settings/settings.js");
const vector2_js_1 = require("../math/vector2.js");
const rect_js_1 = require("../utils/rect.js");
const rectVsRect = function (a, b) {
    return (a.position.x + a.size.x > b.position.x &&
        a.position.x < b.position.x + b.size.x &&
        a.position.y + a.size.y > b.position.y &&
        a.position.y < b.position.y + b.size.y);
};
exports.rectVsRect = rectVsRect;
const rayVsRect = function (rayOrigin, rayDirection, target) {
    let contactPoint = vector2_js_1.Vector2.ZERO;
    let contactNormal = vector2_js_1.Vector2.ZERO;
    const tNear = vector2_js_1.Vector2.divide(vector2_js_1.Vector2.subtract(target.position, rayOrigin), rayDirection);
    const tFar = vector2_js_1.Vector2.divide(vector2_js_1.Vector2.subtract(vector2_js_1.Vector2.add(target.position, target.size), rayOrigin), rayDirection);
    if (Number.isNaN(tFar.y) || Number.isNaN(tFar.x))
        return { collision: false };
    if (Number.isNaN(tNear.y) || Number.isNaN(tNear.x))
        return { collision: false };
    if (tNear.x > tFar.x) {
        const temp = tNear.x;
        tNear.x = tFar.x;
        tFar.x = temp;
    }
    if (tNear.y > tFar.y) {
        const temp = tNear.y;
        tNear.y = tFar.y;
        tFar.y = temp;
    }
    if (tNear.x > tFar.y || tNear.y > tFar.x)
        return { collision: false };
    const tHitNear = Math.max(tNear.x, tNear.y);
    const tHitFar = Math.min(tFar.x, tFar.y);
    if (tHitFar < 0)
        return { collision: false };
    contactPoint = vector2_js_1.Vector2.add(rayOrigin, vector2_js_1.Vector2.multiplyBy(rayDirection, tHitNear));
    if (tNear.x > tNear.y) {
        contactNormal = rayDirection.x < 0 ? vector2_js_1.Vector2.RIGHT : vector2_js_1.Vector2.LEFT;
    }
    else if (tNear.x < tNear.y) {
        contactNormal = rayDirection.y < 0 ? vector2_js_1.Vector2.UP : vector2_js_1.Vector2.DOWN;
    }
    return {
        collision: true,
        contactPoint,
        contactNormal,
        tHitNear,
    };
};
exports.rayVsRect = rayVsRect;
const dynamicRectVsRect = function (dynamicRect, target) {
    if (dynamicRect.velocity.x === 0 && dynamicRect.velocity.y === 0) {
        return { collision: false };
    }
    const expandedRect = new rect_js_1.Rect(vector2_js_1.Vector2.subtract(target.position, vector2_js_1.Vector2.divideBy(dynamicRect.size, 2)), vector2_js_1.Vector2.add(target.size, dynamicRect.size));
    const collision = (0, exports.rayVsRect)(vector2_js_1.Vector2.add(dynamicRect.position, vector2_js_1.Vector2.divideBy(dynamicRect.size, 2)), vector2_js_1.Vector2.multiplyBy(dynamicRect.velocity, 1 / settings_js_1.Settings.main.PHYSICS_CYCLES_PER_SECONDS), expandedRect);
    if (collision.collision) {
        if (collision.tHitNear < 1 && collision.tHitNear >= 0) {
            return collision;
        }
    }
    return {
        collision: false,
    };
};
exports.dynamicRectVsRect = dynamicRectVsRect;
