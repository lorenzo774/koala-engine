"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Camera = void 0;
const settings_js_1 = require("../settings/settings.js");
const component_js_1 = require("../component.js");
const vector2_js_1 = require("../math/vector2.js");
class Camera extends component_js_1.Component {
    transformToFollow;
    startPosition;
    followY;
    static _main;
    static get main() {
        return Camera._main;
    }
    static set main(camera) {
        Camera._main = camera;
    }
    _position;
    static get position() {
        return Camera._main ? Camera._main._position : vector2_js_1.Vector2.ZERO;
    }
    constructor(entity, transformToFollow, startPosition = vector2_js_1.Vector2.ZERO, followY = false) {
        super(entity);
        this.transformToFollow = transformToFollow;
        this.startPosition = startPosition;
        this.followY = followY;
        this._position = this.getCameraPosition();
    }
    getCameraPosition() {
        const cameraTransformDelta = (this.followY
            ? this.transformToFollow.position
            : new vector2_js_1.Vector2(this.transformToFollow.position.x, 0));
        return vector2_js_1.Vector2.add(cameraTransformDelta, this.startPosition);
    }
    update() {
        this._position = vector2_js_1.Vector2.subtract(this.getCameraPosition(), vector2_js_1.Vector2.divideBy(settings_js_1.Settings.main.SCREEN_SIZE, 2));
    }
}
exports.Camera = Camera;
