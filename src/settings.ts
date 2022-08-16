import { Vector2 } from "./core/math/vector2.js";

export class Settings {
    // DEV
    public static DEBUG_MODE: boolean = true;
    public static DEBUG_COLOR: string = "rgba(155, 0, 0, 0.5)";

    // World attributes
    public static get SCREEN_SIZE(): Vector2 {
        return new Vector2(Settings.WIDTH, Settings.HEIGHT);
    }
    public static WIDTH: number;
    public static HEIGHT: number;
    public static TILE_SIZE: number = 20;
    public static SCALE: number = 4;
    public static TILE_SCALED = Settings.TILE_SIZE * Settings.SCALE;
    public static GRAVITY: number = 290;
    public static WORLD: number[][] = [
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

    // Rendering
    public static FPS: number = 60;

    // Physics
    public static PHYSICS_CYCLES_PER_SECONDS = 120;
}
