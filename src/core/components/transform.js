"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transform = void 0;
const component_js_1 = require("../component.js");
const vector2_js_1 = require("../math/vector2.js");
class Transform extends component_js_1.Component {
    position;
    scale;
    constructor(entity, position = vector2_js_1.Vector2.ZERO, scale = vector2_js_1.Vector2.ONE) {
        super(entity);
        this.position = position;
        this.scale = scale;
    }
}
exports.Transform = Transform;
