import { Vector2 } from "./core/math/vector2.js";

export class Settings {
    // World attributes
    static get SCREEN_SIZE(): Vector2 {
        return new Vector2(Settings.WIDTH, Settings.HEIGHT);
    }
    static WIDTH: number;
    static HEIGHT: number;
    static TILE_SIZE: number = 20;
    static SCALE: number = 4;
    static TILE_SCALED = Settings.TILE_SIZE * Settings.SCALE;
    static GRAVITY: number = 1.25;
    static WORLD: number[][] = [
        [],
        [],
        [],
        [],
        [],
        [-1, -1, -1, -1, -1, -1, 4, 5, 5, 5, 6],
        [],
        [],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3],
        [-1, -1, 8, 9, 9, 9, 9, 10, -1, -1, 0, 1, 1, 1, 1, 1, 2],
        [-1, -1, 16, 17, 17, 17, 17, 18, -1, -1, -1],
    ];

    // DEV
    static DEBUG_MODE: boolean = true;
    static DEBUG_COLOR: string = "rgba(155, 0, 0, 0.5)";

    // Rendering
    static FPS: number = 60;
}
