import { Settings } from "../../settings.js";
import { CollisionBody } from "../components/bodies/collisionbody.js";
import { Entity } from "../entity.js";
import { Vector2 } from "../math/vector2.js";
import { Rect } from "../utils/rect.js";
import { MouseInput } from "../input/mouse-input.js";
import { rayVsRect, dynamicRectVsRect } from "./swept-functions.js";

/**
 * Check collisions between entities with rigidbody - staticbody
 */
export class PhysicsEngine {
    // FIXME: JUST A TEST!!
    private rects: Rect[] = [
        new Rect(
            Vector2.divideBy(Settings.SCREEN_SIZE, 2),
            new Vector2(Settings.TILE_SCALED, Settings.TILE_SCALED)
        ),
        new Rect(
            new Vector2(Settings.TILE_SCALED * 4, Settings.TILE_SCALED * 4),
            new Vector2(Settings.TILE_SCALED, Settings.TILE_SCALED)
        ),
    ];
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

    private drawRect(
        ctx: CanvasRenderingContext2D,
        rect: Rect,
        color: string = "red"
    ) {
        ctx.fillStyle = color;
        ctx.fillRect(
            rect.position.x,
            rect.position.y,
            rect.size.x,
            rect.size.y
        );
    }

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
        const player = this.rects[0];

        const mousePos = MouseInput.getMousePos();
        const rayDirection = Vector2.subtract(mousePos, this.rayOrigin);

        player.velocity = rayDirection;
        player.position = Vector2.add(
            player.position,
            Vector2.multiply(player.velocity.normalized, 3)
        );

        const collision = rayVsRect(this.rayOrigin, rayDirection, player);

        const rectColor =
            collision.collision && collision.tHitNear < 1 ? "yellow" : "red";

        // DRAW RECTs
        for (let i = 0; i < this.rects.length; i++) {
            this.drawRect(ctx, this.rects[i]);
        }

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
