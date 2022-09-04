"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rect = void 0;
const vector2_js_1 = require("../math/vector2.js");
class Rect {
    position;
    size;
    velocity;
    constructor(position, size, velocity = vector2_js_1.Vector2.ZERO) {
        this.position = position;
        this.size = size;
        this.velocity = velocity;
    }
}
exports.Rect = Rect;
