export class Vector2 {
    constructor(public x: number, public y: number) {}

    public static get ZERO() {
        return new Vector2(0, 0);
    }

    public static get ONE() {
        return new Vector2(1, 1);
    }

    /**
     * DIRECTIONS
     */
    public static get RIGHT() {
        return new Vector2(1, 0);
    }

    public static get LEFT() {
        return new Vector2(-1, 0);
    }

    public static get UP() {
        return new Vector2(0, -1);
    }

    public static get DOWN() {
        return new Vector2(0, 1);
    }

    /**
     * Divide each component of 2 vectors
     * @returns Vector with components divided
     */
    public static divide(a: Vector2, b: Vector2): Vector2 {
        return new Vector2(a.x / b.x, a.y / b.y);
    }

    /**
     * Subtract each component of 2 vectors
     * @returns Vector with each component subtracted
     */
    public static subtract(a: Vector2, b: Vector2): Vector2 {
        return new Vector2(a.x - b.x, a.y - b.y);
    }

    /**
     * Add each component of 2 vectors
     * @returns Vector with each component added
     */
    public static add(a: Vector2, b: Vector2): Vector2 {
        return new Vector2(a.x + b.x, a.y + b.y);
    }

    /**
     * Multiply each component of 2 vectors by a number
     * @returns Vector with each component multiplied
     */

    public static multiply(a: Vector2, n: number): Vector2 {
        return new Vector2(a.x * n, a.y * n);
    }

    // String
    public toString = (): string => {
        return `Vector2(x: ${this.x}, y: ${this.y})`;
    };
}
