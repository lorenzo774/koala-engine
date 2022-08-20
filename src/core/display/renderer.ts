import { Settings } from "../../settings.js";
import { Entity } from "../entity.js";
import { Time } from "../utils/time.js";
import { UIDebug } from "./ui-debug.js";

export class Renderer {
    private before: number;

    constructor(
        private ctx: CanvasRenderingContext2D,
        private entities: Entity[]
    ) {
        this.before = Date.now();
    }

    public run() {
        // Frame handler
        const now: number = Date.now();
        const delta: number = (now - this.before) / 1000;
        if (delta >= 1 / Settings.FPS) {
            Time.deltaTime = delta;
            this.draw();
            if (Settings.DEBUG_MODE) {
                this.debugger();
            }
            this.before = now;
        }
        requestAnimationFrame(this.run.bind(this));
    }

    private debugger() {
        this.entities.forEach((entity) => entity.debugDraw(this.ctx));
        UIDebug.I.run(this.entities, 1 / Time.deltaTime);
    }

    private draw() {
        this.ctx.clearRect(0, 0, Settings.WIDTH, Settings.HEIGHT);
        this.entities.forEach((entity) => entity.draw(this.ctx));
    }
}
