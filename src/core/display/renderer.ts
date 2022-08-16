import { Settings } from "../../settings.js";
import { Entity } from "../entity.js";
import { UIDebug } from "./ui-debug.js";

export class Renderer {
    constructor(
        private ctx: CanvasRenderingContext2D,
        private entities: Entity[]
    ) {}

    public run() {
        this.draw();
        if (Settings.DEBUG_MODE) {
            this.debugger();
        }
    }

    private debugger() {
        this.entities.forEach((entity) => entity.debugDraw(this.ctx));
        UIDebug.I.run(this.entities, Settings.FPS);
    }

    private draw() {
        this.ctx.clearRect(0, 0, Settings.WIDTH, Settings.HEIGHT);
        this.entities.forEach((entity) => entity.draw(this.ctx));
    }
}
