import { Settings } from "../../settings.js";
import { CollisionBody } from "../components/collisionbody.js";
import { Entity } from "../entity.js";
import { Vector2 } from "../math/vector2.js";
import { Rect } from "../rect.js";
import { MouseInput } from "./mouse-input-system.js";

/**
 * Check collisions between entities with rigidbody - staticbody
 */
export class CollisionSystem {
    // FIXME: JUST A TEST!!
    private rects: Rect[];
    private rayOrigin: Vector2 = new Vector2(
        Settings.WIDTH / 2,
        Settings.HEIGHT / 2
    );

    constructor(private entities: Entity[]) {}

    private getCollisionBody(entity: Entity): CollisionBody | null {
        for (const component of entity.components) {
            if (component instanceof CollisionBody) {
                return component as CollisionBody;
            }
        }
        return null;
    }

    // TODO: Implement
    private rayVsRect(
        rayOrigin: Vector2,
        rayDirection: Vector2,
        target: Rect
    ) {}

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

        // DRAW RAY
        ctx.beginPath();
        ctx.lineWidth = 4;
        ctx.strokeStyle = "yellow";
        ctx.moveTo(this.rayOrigin.x, this.rayOrigin.y);
        const mousePos = MouseInput.getMousePos();
        ctx.lineTo(mousePos.x, mousePos.y);
        ctx.stroke();
        ctx.closePath();

        // Reset line width
        ctx.lineWidth = 1;
    }
}
