export class Vector2 {
    constructor(public x: number, public y: number) {}

    /*
     * MATH
     */
    public get length(): number {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }

    public get normalized(): Vector2 {
        return new Vector2(this.x / this.length, this.y / this.length);
    }

    /**
     * VALUES
     */
    public static get ZERO(): Vector2 {
        return new Vector2(0, 0);
    }

    public static get ONE(): Vector2 {
        return new Vector2(1, 1);
    }

    /*
     * DIRECTIONS
     */

    /**
     * Vector2(1, 0)
     */
    public static get RIGHT(): Vector2 {
        return new Vector2(1, 0);
    }

    /**
     * Vector2(-1, 0)
     */
    public static get LEFT(): Vector2 {
        return new Vector2(-1, 0);
    }

    /**
     * Vector2(0, 1)
     */
    public static get UP(): Vector2 {
        return new Vector2(0, 1);
    }

    /**
     * Vector2(0, -1)
     */
    public static get DOWN(): Vector2 {
        return new Vector2(0, -1);
    }

    /**
     * Divide each component of 2 vectors
     * @returns Vector with components divided
     */
    public static divide(a: Vector2, b: Vector2): Vector2 {
        return new Vector2(a.x / b.x, a.y / b.y);
    }

    /**
     * Divide each component of 2 vectors by a number
     * @returns Vector with components divided
     */
    public static divideBy(a: Vector2, n: number): Vector2 {
        return new Vector2(a.x / n, a.y / n);
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
     * Multiply each component of 2 vectors
     * @returns Vector with each component multiplied
     */

    public static multiply(a: Vector2, b: Vector2): Vector2 {
        return new Vector2(a.x * b.x, a.y * b.y);
    }

    /**
     * Multiply each component of 2 vectors by a number
     * @returns Vector with each component multiplied
     */

    public static multiplyBy(a: Vector2, n: number): Vector2 {
        return new Vector2(a.x * n, a.y * n);
    }

    // String
    public toString = (): string => {
        return `Vector2(x: ${this.x}, y: ${this.y})`;
    };
}
