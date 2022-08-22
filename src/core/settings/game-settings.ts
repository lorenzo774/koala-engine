import { Vector2 } from "../math/vector2.js";

export interface GameSettings {
    /*
     DEV
    */

     DEBUG_MODE:  boolean,
     DEBUG_COLOR: string,

    /*
     World attributes
    */

    SCREEN_SIZE: Vector2,
    WIDTH: number,
    HEIGHT: number,
    TILE_SIZE: number,
    TILE_SCALED: number,
    SCALE: number,
    GRAVITY: number,
    WORLD: Array<Array<number>>,

    /*
     Rendering
    */

    FPS: number,

    /*
     Physics
    */

    PHYSICS_CYCLES_PER_SECONDS: number,
}