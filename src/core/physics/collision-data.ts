import { Vector2 } from "../math/vector2.js";
import { CollisionBody } from "../components/bodies/collisionbody.js";

export interface CollisionData {
    collision: boolean;
    body?: CollisionBody,
    contactPoint?: Vector2;
    contactNormal?: Vector2;
    tHitNear?: number;
}