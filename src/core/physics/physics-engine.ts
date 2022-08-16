import { Settings } from "../../settings.js";
import { CollisionBody } from "../components/bodies/collisionbody.js";
import { RigidBody } from "../components/bodies/rigidbody.js";
import { StaticBody } from "../components/bodies/staticbody.js";
import { Entity } from "../entity.js";
import { Vector2 } from "../math/vector2.js";
import { Rect } from "../utils/rect.js";
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

    private getBody(entity: Entity): RigidBody | StaticBody | null {
        for (const component of entity.components) {
            if (component instanceof RigidBody) {
                return component as RigidBody;
            }
            if (component instanceof StaticBody) {
                return component as StaticBody;
            }
        }
        return null;
    }

    /**
     * Check collisions
     */
    private checkCollisions() {
        for (const entity of this.entities) {
            const rigidbody = this.getBody(entity);
            if (!rigidbody) continue;
            if (rigidbody instanceof StaticBody) continue;

            const rigidBodyCollisions: CollisionData[] =
                new Array<CollisionData>();

            // The entity has a rigidbody
            for (const otherEntity of this.entities) {
                if (otherEntity.name === entity.name) continue;
                const staticbody = this.getBody(otherEntity);
                if (!staticbody) continue;
                if (staticbody instanceof RigidBody) continue;

                // The other entity has a staticbody, the 2 objects can collide
                const collision = dynamicRectVsRect(
                    new Rect(
                        rigidbody.position,
                        rigidbody.collisionBox.size,
                        rigidbody.velocity
                    ),
                    new Rect(staticbody.position, staticbody.collisionBox.size)
                );
                if (!collision.collision) continue;

                rigidBodyCollisions.push(collision);
            }
            // Order collisions by contact time
            this.rigidBodiesCollisions.set(
                rigidbody,
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
            const rigidBody = entity.getComponent<RigidBody>(RigidBody);
            if (rigidBody) {
                rigidBody.physicsUpdate();
            }
        });
    }

    public init() {
        setInterval(
            this.run.bind(this),
            1 / Settings.PHYSICS_CYCLES_PER_SECONDS
        );
    }
}
