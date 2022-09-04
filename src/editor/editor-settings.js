"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEditorSettings = void 0;
const vector2_js_1 = require("../core/math/vector2.js");
const getEditorSettings = function (canvas) {
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
        WORLD: [[-1]],
        FPS: 80,
        PHYSICS_CYCLES_PER_SECONDS: 120,
    };
};
exports.getEditorSettings = getEditorSettings;
