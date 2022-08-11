import { CollisionBody } from "./components/collisionbody.js";
import { Entity } from "./entity.js";
import { Vector2 } from "./math/vector2.js";
import { Rect } from "./rect.js";

/**
 * Check collisions between entities with rigidbody - staticbody
 */
export class CollisionSystem {
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
    checkCollisions() {
        /*
            OLD
        */
        // for (const entity of this.entities) {
        //     const collisionBody = this.getCollisionBody(entity);
        //     if (!collisionBody) {
        //         continue;
        //     }
        //     for (const otherEntity of this.entities) {
        //         if (entity.name === otherEntity.name) {
        //             continue;
        //         }
        //         const otherCollisionBody = this.getCollisionBody(otherEntity);
        //         if (!otherCollisionBody) {
        //             continue;
        //         }
        //         collisionBody.checkCollision(otherCollisionBody);
        //     }
        // }
        /*
            TODO: 
            Implement SWEPT AABB Resolution for RigidBody 
            (In the game we have more than )
        */
    }
}
