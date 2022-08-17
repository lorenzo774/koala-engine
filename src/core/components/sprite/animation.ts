import { SpriteSheet } from "./sprite-sheet.js";

export class Animation {
    public speedFactor: number;

    constructor(
        public spriteSheet: SpriteSheet,
        public name: string,
        public speed: number = 1,
        public loop: boolean = false
    ) {
        this.speedFactor = 100 / speed;
    }
}
