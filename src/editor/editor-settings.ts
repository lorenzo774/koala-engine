import { GameSettings } from "@koala-engine/core/settings/game-settings.js";
import { Vector2 } from "@koala-engine/core/math/vector2.js";

export const getEditorSettings = function (
    canvas: HTMLCanvasElement
): GameSettings {
    return {
        DEBUG_MODE: true,
        DEBUG_COLOR: "rgba(155, 0, 0, 0.5)",
        WIDTH: canvas.width,
        HEIGHT: canvas.height,
        SCREEN_SIZE: new Vector2(canvas.width, canvas.height),
        TILE_SIZE: 20,
        SCALE: 4,
        TILE_SCALED: 80,
        GRAVITY: 290,
        WORLD: [[-1]],
        FPS: 80,
        PHYSICS_CYCLES_PER_SECONDS: 120,
    };
};
