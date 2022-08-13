import { Settings } from "../../settings.js";
import { CollisionBody } from "../components/bodies/collisionbody.js";
import { Entity } from "../entity.js";
import { Vector2 } from "../math/vector2.js";
import { Rect } from "../utils/rect.js";
import { MouseInput } from "../input/mouse-input.js";
import { CollisionData } from "./collision-data.js";

/**
 * Check collisions between entities with rigidbody - staticbody
 */
export class CollisionSystem {
    // FIXME: JUST A TEST!!
    private rects: Rect[] = [
        new Rect(
            new Vector2(Settings.TILE_SCALED * 4, Settings.TILE_SCALED * 4),
            new Vector2(Settings.TILE_SCALED, Settings.TILE_SCALED)
        ),
    ];
    private rayOrigin: Vector2 = new Vector2(
        Settings.WIDTH / 2,
        Settings.HEIGHT / 2
    );
    private time: number;

    constructor(private entities: Entity[]) {}

    private getCollisionBody(entity: Entity): CollisionBody | null {
        for (const component of entity.components) {
            if (component instanceof CollisionBody) {
                return component as CollisionBody;
            }
        }
        return null;
    }

    /**
     * Check if a ray has collide with a rect
     * @returns Collision information
     */
    private rayVsRect(
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
            Vector2.subtract(
                Vector2.add(target.position, target.size),
                rayOrigin
            ),
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
        const tHitFar = Math.max(tNear.x, tNear.y);

        if (tHitFar < 0) return { collision: false };

        contactPoint = Vector2.add(
            rayOrigin,
            Vector2.multiply(rayDirection, tHitNear)
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
    }

    // TODO: Implement
    private dynamicRectVsRect(dynamicRect: Rect, target: Rect) {}

    /**
     * Check collisions between CollisionBody
     */
    checkCollisions(
        // FIXME: JUST A TEST!!
        ctx: CanvasRenderingContext2D
    ) {
        /*
            TODO: 
            Implement SWEPT AABB Resolution for RigidBody 
            (In the game we have more than )
        */
        // FIXME: JUST A TEST!!
        const myRect = this.rects[0];

        const mousePos = MouseInput.getMousePos();
        const rayDirection = Vector2.subtract(mousePos, this.rayOrigin);

        const collision = this.rayVsRect(this.rayOrigin, rayDirection, myRect);
        this.time = collision.tHitNear;

        const rectColor =
            collision.collision && this.time < 1 ? "yellow" : "red";

        // DRAW RECT
        ctx.fillStyle = rectColor;
        ctx.fillRect(
            myRect.position.x,
            myRect.position.y,
            myRect.size.x,
            myRect.size.y
        );

        // DRAW RAY
        ctx.beginPath();
        ctx.lineWidth = 4;
        ctx.strokeStyle = "yellow";
        ctx.moveTo(this.rayOrigin.x, this.rayOrigin.y);
        ctx.lineTo(mousePos.x, mousePos.y);
        ctx.stroke();
        ctx.closePath();

        // Reset line width
        ctx.lineWidth = 1;
    }
}
