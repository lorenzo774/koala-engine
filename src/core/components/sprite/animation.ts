import { SpriteSheet } from "./sprite-sheet.js";

export class Animation {
    speedFactor: number;

    constructor(
        public spriteSheet: SpriteSheet,
        public name: string,
        public speed: number = 1
    ) {
        this.speedFactor = 100 / speed;
    }
}
