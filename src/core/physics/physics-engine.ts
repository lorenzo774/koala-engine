import { Settings } from "../../settings.js";
import { RigidBody } from "../components/bodies/rigidbody.js";
import { StaticBody } from "../components/bodies/staticbody.js";
import { TilemapBody } from "../components/bodies/tilemapbody.js";
import { Entity } from "../entity.js";
import { Vector2 } from "../math/vector2.js";
import { CollisionData } from "./collision-data.js";
import { dynamicRectVsRect } from "./swept-functions.js";

/**
 * Check collisions between entities with rigidbody - staticbody
 */
export class PhysicsEngine {
    /**
     *  Every RigidBody has its own collisions (staticBody, contactTime of the collision)
     */
    private rigidBodiesCollisions: Map<RigidBody, CollisionData[]>;

    constructor(private entities: Entity[]) {}

    private getBody(
        entity: Entity
    ): RigidBody | StaticBody | TilemapBody | null {
        for (const component of entity.components) {
            if (component instanceof RigidBody) {
                return component as RigidBody;
            }
            if (component instanceof StaticBody) {
                return component as StaticBody;
            }
            if (component instanceof TilemapBody) {
                return component as TilemapBody;
            }
        }
        return null;
    }

    /**
     * Check collisions
     */
    private checkCollisions() {
        for (const entity of this.entities) {
            let body = this.getBody(entity);
            if (!body) continue;
            if (body instanceof StaticBody) continue;
            if (body instanceof TilemapBody) continue;
            body = body as RigidBody;

            const rigidBodyCollisions: CollisionData[] =
                new Array<CollisionData>();

            // The entity has a rigidbody
            for (const otherEntity of this.entities) {
                if (otherEntity.name === entity.name) continue;
                const otherBody = this.getBody(otherEntity);
                if (!otherBody) continue;
                if (otherBody instanceof RigidBody) continue;

                // The other entity has a staticbody or tilemapbody, the 2 objects can collide
                for (const rect of otherBody.getCollisions()) {
                    let collision: CollisionData = { collision: false };
                    for (const rigidBodyCol of body.getCollisions()) {
                        collision = dynamicRectVsRect(rigidBodyCol, rect);
                        if (!collision.collision) {
                            body.lastContactNormal = Vector2.ZERO; // No contact normal
                            continue;
                        }
                        rigidBodyCollisions.push(collision);
                    }
                }
            }
            // Order collisions by contact time
            this.rigidBodiesCollisions.set(
                body,
                rigidBodyCollisions.sort(
                    (a, b): number => a.tHitNear - b.tHitNear
                )
            );
        }
    }

    /**
     * Resolve collisions for every rigidBody
     */
    private resolveCollisions() {
        for (const [
            rigidBody,
            collisions,
        ] of this.rigidBodiesCollisions.entries()) {
            // Resolve collision for the rigidbody
            for (const collision of collisions) {
                rigidBody.lastContactNormal = collision.contactNormal;
                rigidBody.velocity = Vector2.add(
                    rigidBody.velocity,
                    Vector2.multiplyBy(
                        Vector2.multiply(
                            collision.contactNormal,
                            new Vector2(
                                Math.abs(rigidBody.velocity.x),
                                Math.abs(rigidBody.velocity.y)
                            )
                        ),
                        1 - collision.tHitNear
                    )
                );
            }
        }
    }

    /**
     * Check collisions between CollisionBody
     */
    private run() {
        this.rigidBodiesCollisions = new Map<RigidBody, CollisionData[]>(); // Reset collisions

        this.entities.forEach((entity) => entity.update()); // Normal update
        this.checkCollisions();
        this.resolveCollisions(); // Resolution
        // Update position for dyanmic objects
        this.entities.forEach((entity) => {
            entity.physicsUpdate();
        });
    }

    public init() {
        setInterval(
            this.run.bind(this),
            1 / Settings.PHYSICS_CYCLES_PER_SECONDS
        );
    }
}
