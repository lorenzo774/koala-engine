import { Vector2 } from "../math/vector2";

export interface CollisionData {
    collision: boolean;
    contactPoint?: Vector2;
    contactNormal?: Vector2;
    tHitNear?: number;
}
