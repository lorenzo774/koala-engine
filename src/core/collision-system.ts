import { CollisionBody } from "./components/collisionbody.js";
import { Entity } from "./entity.js";

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

    /**
     * Check collisions between CollisionBody
     */
    checkCollisions() {
        for (const entity of this.entities) {
            const collisionBody = this.getCollisionBody(entity);
            if (!collisionBody) {
                continue;
            }
            for (const otherEntity of this.entities) {
                if (entity.name === otherEntity.name) {
                    continue;
                }
                const otherCollisionBody = this.getCollisionBody(otherEntity);
                if (!otherCollisionBody) {
                    continue;
                }
                collisionBody.checkCollision(otherCollisionBody);
            }
        }
    }
}
