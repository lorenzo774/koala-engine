"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Animation = void 0;
class Animation {
    spriteSheet;
    name;
    speed;
    loop;
    speedFactor;
    constructor(spriteSheet, name, speed = 1, loop = false) {
        this.spriteSheet = spriteSheet;
        this.name = name;
        this.speed = speed;
        this.loop = loop;
        this.speedFactor = 100 / speed;
    }
}
exports.Animation = Animation;
