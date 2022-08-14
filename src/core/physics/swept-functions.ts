import { Settings } from "../../settings.js";
import { Vector2 } from "../math/vector2.js";
import { Rect } from "../utils/rect.js";
import { CollisionData } from "./collision-data.js";

/**
 * Check if a ray has collide with a rect
 * @returns Collision information
 */
export const rayVsRect = function (
    rayOrigin: Vector2,
    rayDirection: Vector2,
    target: Rect
): CollisionData {
    let contactPoint = Vector2.ZERO;
    let contactNormal = Vector2.ZERO;

    const tNear = Vector2.divide(
        Vector2.subtract(target.position, rayOrigin),
        rayDirection
    );

    const tFar = Vector2.divide(
        Vector2.subtract(Vector2.add(target.position, target.size), rayOrigin),
        rayDirection
    );

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

    if (tNear.x > tFar.y || tNear.y > tFar.x) return { collision: false };

    const tHitNear = Math.max(tNear.x, tNear.y);
    const tHitFar = Math.min(tFar.x, tFar.y);

    if (tHitFar < 0) return { collision: false };

    contactPoint = Vector2.add(
        rayOrigin,
        Vector2.multiplyBy(rayDirection, tHitNear)
    );

    if (tNear.x > tNear.y) {
        contactNormal = rayDirection.x < 0 ? Vector2.RIGHT : Vector2.LEFT;
    } else if (tNear.x < tNear.y) {
        contactNormal = rayDirection.y < 0 ? Vector2.UP : Vector2.DOWN;
    }

    return {
        collision: true,
        contactPoint,
        contactNormal,
        tHitNear,
    };
};

/**
 * Check if a dynamic rect has collide with a rect
 * @returns Collision information
 */
export const dynamicRectVsRect = function (
    ctx: CanvasRenderingContext2D,
    dynamicRect: Rect,
    target: Rect
): CollisionData {
    if (dynamicRect.velocity.x === 0 && dynamicRect.velocity.y === 0) {
        return { collision: false };
    }

    const expandedRect: Rect = new Rect(
        Vector2.subtract(
            target.position,
            Vector2.divideBy(dynamicRect.size, 2)
        ),
        Vector2.add(target.size, dynamicRect.size)
    );

    // Draw expanded rect
    ctx.fillStyle = "rgba(0, 255, 0, 0.3)";
    ctx.fillRect(
        expandedRect.position.x,
        expandedRect.position.y,
        expandedRect.size.x,
        expandedRect.size.y
    );

    const collision = rayVsRect(
        Vector2.add(
            dynamicRect.position,
            Vector2.divideBy(dynamicRect.size, 2)
        ),
        Vector2.multiplyBy(dynamicRect.velocity, 1 / Settings.FPS),
        expandedRect
    );

    if (collision.contactPoint) {
        // Draw contact point
        ctx.fillStyle = "rgba(0, 0, 255, 0.7)";
        ctx.fillRect(collision.contactPoint.x, collision.contactPoint.y, 8, 8);
    }

    console.log(collision.tHitNear);

    if (collision.collision) {
        if (collision.tHitNear < 1 && collision.tHitNear <= 0) {
            return collision;
        }
    }

    return {
        collision: false,
    };
};
