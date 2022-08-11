import { Vector2 } from "./math/vector2.js";

export class ImageRect {
    constructor(
        /**
         * Position to start rendering the source image
         */
        public position: Vector2,
        /**
         * Width of the rendering of the source image
         */
        public size: Vector2
    ) {}
}
