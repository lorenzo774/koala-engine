import { Vector2 } from "../math/vector2.js";

export class Rect {
    constructor(
        public position: Vector2,
        public size: Vector2,
        public velocity: Vector2 = Vector2.ZERO
    ) {}
}
