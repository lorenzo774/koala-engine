"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPlatformSettings = void 0;
const vector2_js_1 = require("../core/math/vector2.js");
const getPlatformSettings = function (canvas) {
    return {
        DEBUG_MODE: true,
        DEBUG_COLOR: "rgba(155, 0, 0, 0.5)",
        WIDTH: canvas.width,
        HEIGHT: canvas.height,
        SCREEN_SIZE: new vector2_js_1.Vector2(canvas.width, canvas.height),
        TILE_SIZE: 20,
        SCALE: 4,
        TILE_SCALED: 80,
        GRAVITY: 290,
        WORLD: [
            [
                -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
                -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
                -1, -1,
            ],
            [
                -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
                -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
                -1, -1,
            ],
            [
                -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
                -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
                -1, -1,
            ],
            [
                -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
                -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
                -1, -1,
            ],
            [
                -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
                -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
                -1, -1,
            ],
            [
                -1, 3, -1, -1, -1, -1, 4, 5, 5, 5, 6, -1, -1, -1, -1, -1, -1,
                -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
                -1,
            ],
            [
                -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
                -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
                -1, -1,
            ],
            [
                -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
                -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
                -1, -1,
            ],
            [
                -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, -1, -1, -1,
                -1, -1, -1, -1, 0, 1, 1, 1, 2, -1, -1, -1, -1, -1, -1, -1,
                -1, -1,
            ],
            [
                -1, -1, 8, 9, 9, 9, 9, 10, -1, -1, 0, 1, 1, 1, 1, 1, 2, -1, -1,
                -1, 4, 5, 5, 5, 5, 6, -1, -1, -1, 0, 1, 1, 1, 2,
            ],
            [
                -1, -1, 16, 17, 17, 17, 17, 18, -1, -1, -1, -1, -1, -1, -1, -1,
                -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
                -1, -1,
            ],
        ],
        FPS: 80,
        PHYSICS_CYCLES_PER_SECONDS: 120,
    };
};
exports.getPlatformSettings = getPlatformSettings;
