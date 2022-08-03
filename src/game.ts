import { Entity } from "./core/entity.js";
import { Player } from "./player/player.js";
import { Settings } from "./settings.js";

export class Game {
    entities: Entity[] = [new Player()];

    constructor(private ctx: CanvasRenderingContext2D) {
        this.runLoop();
        this.entities.forEach((entity) => entity.start());
    }

    reload() {
        this.entities.forEach((entity) => entity.start());
    }

    private runLoop() {
        this.update();
        this.draw();
        requestAnimationFrame(this.runLoop.bind(this));
    }

    private draw() {
        this.ctx.clearRect(0, 0, Settings.WIDTH, Settings.HEIGHT);
        this.entities.forEach((entity) => entity.draw(this.ctx));
    }

    private update() {
        this.entities.forEach((entity) => entity.update());
    }
}
