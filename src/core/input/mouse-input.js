"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MouseInput = void 0;
const vector2_js_1 = require("../math/vector2.js");
class MouseInput {
    static lastMouseLocation;
    static setLastMouseLocation(e) {
        this.lastMouseLocation = new vector2_js_1.Vector2(e.clientX, e.clientY);
    }
    static getMousePos() {
        if (!this.lastMouseLocation) {
            return vector2_js_1.Vector2.ZERO;
        }
        return this.lastMouseLocation;
    }
    static listen() {
        window.addEventListener("mousemove", this.setLastMouseLocation.bind(this));
    }
}
exports.MouseInput = MouseInput;
