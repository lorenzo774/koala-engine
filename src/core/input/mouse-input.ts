import { Vector2 } from "../math/vector2.js";

export class MouseInput {
    private static lastMouseLocation: Vector2;

    private static setLastMouseLocation(e: MouseEvent) {
        this.lastMouseLocation = new Vector2(e.clientX, e.clientY);
    }

    public static getMousePos(): Vector2 {
        if (!this.lastMouseLocation) {
            return Vector2.ZERO;
        }

        return this.lastMouseLocation;
    }

    public static listen() {
        window.addEventListener(
            "mousemove",
            this.setLastMouseLocation.bind(this)
        );
    }
}
