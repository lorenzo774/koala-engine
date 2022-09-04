"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vector2 = void 0;
class Vector2 {
    x;
    y;
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    get length() {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }
    get normalized() {
        return new Vector2(this.x / this.length, this.y / this.length);
    }
    static get ZERO() {
        return new Vector2(0, 0);
    }
    static get ONE() {
        return new Vector2(1, 1);
    }
    static get RIGHT() {
        return new Vector2(1, 0);
    }
    static get LEFT() {
        return new Vector2(-1, 0);
    }
    static get UP() {
        return new Vector2(0, 1);
    }
    static get DOWN() {
        return new Vector2(0, -1);
    }
    static divide(a, b) {
        return new Vector2(a.x / b.x, a.y / b.y);
    }
    static divideBy(a, n) {
        return new Vector2(a.x / n, a.y / n);
    }
    static subtract(a, b) {
        return new Vector2(a.x - b.x, a.y - b.y);
    }
    static subtractBy(a, n) {
        return new Vector2(a.x - n, a.y - n);
    }
    static add(a, b) {
        return new Vector2(a.x + b.x, a.y + b.y);
    }
    static multiply(a, b) {
        return new Vector2(a.x * b.x, a.y * b.y);
    }
    static multiplyBy(a, n) {
        return new Vector2(a.x * n, a.y * n);
    }
    toString = () => {
        return `Vector2(x: ${this.x}, y: ${this.y})`;
    };
}
exports.Vector2 = Vector2;
