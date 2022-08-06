export class Settings {
    // World attributes
    static WIDTH: number;
    static HEIGHT: number;
    static TILE_SIZE: number = 20;
    static SCALE: number = 5;
    static TILE_SCALED = Settings.TILE_SIZE * Settings.SCALE;
    static GRAVITY: number = 0.6;

    // DEV
    static DEBUG_MODE: boolean = false;

    // Rendering
    static FPS: number = 60;
}
