import { Vector2 } from "./math/vector2.js";

export class CollisionBox {
    constructor(public offset: Vector2, public size: Vector2) {}
}
