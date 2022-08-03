export class Vector2 {
    constructor(public x: number, public y: number) {}

    static get ZERO() {
        return new Vector2(0, 0);
    }
}
