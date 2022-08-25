import { Settings } from "../../settings/settings.js";
import { Entity } from "../../entity.js";
import { Vector2 } from "../../math/vector2.js";
import { CollisionBody } from "./collisionbody.js";
import { Rect } from "../../utils/rect.js";
import { Camera } from "../camera.js";

/**
 * Dyamic body, this body has a velocity and it moves
 */
export class RigidBody extends CollisionBody {
    private fallingFactor: number;
    public velocity: Vector2 = Vector2.ZERO;
    public lastContactNormal: Vector2 = Vector2.ZERO;

    public get onGround(): boolean {
        return this.lastContactNormal.y === -1;
    }

    constructor(
        entity: Entity,
        public collisionBox: Rect = new Rect(
            Vector2.ZERO,
            new Vector2(100, 100)
        ),
        public gravity: boolean = true,
        private mass: number = 1
    ) {
        super(entity);
    }

    public start() {
        this.fallingFactor = this.gravity ? Settings.main.GRAVITY * this.mass : 0;
        this.velocity = Vector2.ZERO;
    }

    public *getCollisions(): IterableIterator<Rect> {
        yield new Rect(
            Vector2.add(this.transform.position, this.collisionBox.position),
            this.collisionBox.size,
            this.velocity
        );
    }

    public update() {
        this.velocity.y += this.fallingFactor * (1 / Settings.main.PHYSICS_CYCLES_PER_SECONDS);
    }

    public physicsUpdate() {
        // Update position
        this.transform.position.x +=
            this.velocity.x * (1 / Settings.main.PHYSICS_CYCLES_PER_SECONDS);
        this.transform.position.y +=
            this.velocity.y * (1 / Settings.main.PHYSICS_CYCLES_PER_SECONDS)
    }

    public debugDraw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = Settings.main.DEBUG_COLOR;
        ctx.fillRect(
            this.transform.position.x +
                this.collisionBox.position.x -
                Camera.position.x,
            this.transform.position.y +
                this.collisionBox.position.y -
                Camera.position.y,
            this.collisionBox.size.x,
            this.collisionBox.size.y
        );
    }

    // String
    public toString = (): string => {
        return `Rigidbody of ${this.entity.name}`;
    };
}
