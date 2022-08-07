export class Settings {
    // World attributes
    static WIDTH: number;
    static HEIGHT: number;
    static TILE_SIZE: number = 20;
    static SCALE: number = 4;
    static TILE_SCALED = Settings.TILE_SIZE * Settings.SCALE;
    static GRAVITY: number = 1.25;

    // DEV
    static DEBUG_MODE: boolean = false;

    // Rendering
    static FPS: number = 60;
}
