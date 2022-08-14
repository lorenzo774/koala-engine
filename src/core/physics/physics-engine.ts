import { Settings } from "../../settings.js";
import { CollisionBody } from "../components/bodies/collisionbody.js";
import { Entity } from "../entity.js";
import { Vector2 } from "../math/vector2.js";
import { Rect } from "../utils/rect.js";
import { MouseInput } from "../input/mouse-input.js";
import { rayVsRect, dynamicRectVsRect } from "./swept-functions.js";
import { TupleType } from "typescript";

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
    private collisions: [number, number][];
    private player: Rect;

    constructor(private entities: Entity[]) {
        this.player = this.rects[0];
    }

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
     * Check collisions
     */
    private checkCollisions(ctx: CanvasRenderingContext2D) {
        for (let i = 1; i < this.rects.length; i++) {
            const collision = dynamicRectVsRect(
                ctx,
                this.player,
                this.rects[i]
            );
            if (collision.collision) {
                this.collisions.push([i, collision.tHitNear]);
            }
        }
        // Order collisions by contact time
        this.collisions.sort((a, b): number => a[1] - b[1]);
    }

    /**
     * Resolve collisions
     */
    private resolveCollisions(ctx: CanvasRenderingContext2D) {
        for (const collision of this.collisions) {
            const result = dynamicRectVsRect(
                ctx,
                this.player,
                this.rects[collision[0]]
            );
            if (result.collision) {
                this.player.velocity = Vector2.add(
                    this.player.velocity,
                    Vector2.multiplyBy(
                        Vector2.multiply(
                            result.contactNormal,
                            new Vector2(
                                Math.abs(this.player.velocity.x),
                                Math.abs(this.player.velocity.y)
                            )
                        ),
                        1 - result.tHitNear
                    )
                );
            }
        }
    }

    /**
     * Check collisions between CollisionBody
     */
    run(
        // FIXME: JUST A TEST!!
        ctx: CanvasRenderingContext2D
    ) {
        /*
                    TODO: 
                    Implement SWEPT AABB Resolution for RigidBody 
                    (In the game we have more than )
                    */
        // FIXME: JUST A TEST!!
        this.collisions = new Array<[number, number]>(); // Reset collisions

        const mousePos = MouseInput.getMousePos();
        const rayDirection = Vector2.subtract(mousePos, this.player.position);

        this.player.velocity = rayDirection;

        this.checkCollisions(ctx);
        this.resolveCollisions(ctx); // Resolution

        console.log();

        // Update player position
        this.player.position = Vector2.add(
            this.player.position,
            Vector2.multiplyBy(
                Vector2.multiplyBy(this.player.velocity.normalized, 200),
                1 / Settings.FPS
            )
        );

        // DRAW RECTs
        for (let i = 0; i < this.rects.length; i++) {
            this.drawRect(ctx, this.rects[i]);
        }

        // DRAW RAY
        ctx.beginPath();
        ctx.lineWidth = 4;
        ctx.strokeStyle = "yellow";
        ctx.moveTo(
            this.player.position.x + this.player.size.x / 2,
            this.player.position.y + this.player.size.y / 2
        );
        ctx.lineTo(mousePos.x, mousePos.y);
        ctx.stroke();
        ctx.closePath();

        // Reset line width
        ctx.lineWidth = 1;
    }
}
