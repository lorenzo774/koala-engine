import { Entity } from "./entity.js";
import { Settings } from "../settings.js";
import { PhysicsEngine } from "./physics/physics-engine.js";
import { UIDebug } from "./debug/ui-debug.js";

export abstract class Game {
    private physicsEngine: PhysicsEngine;
    protected entities: Entity[] = [];

    constructor(private ctx: CanvasRenderingContext2D) {
        this.init();
        this.physicsEngine = new PhysicsEngine(this.entities);
        if (Settings.DEBUG_MODE) {
            UIDebug.I.showDebugUI();
        }
        setInterval(this.runLoop.bind(this), 1000 / Settings.FPS);
        this.runLoop();
    }

    /**
     *  Virtual method, this method will be called on children to initialize entities
     */
    protected init() {}

    reload() {
        this.entities.forEach((entity) => entity.start());
    }

    private runLoop() {
        // COLLISION SYSTEM SHOULD BE HERE!!!!
        this.update();
        this.draw();
        this.physicsEngine.run(
            // FIXME: JUST A TEST!!!!
            this.ctx
        );
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

    private update() {
        this.entities.forEach((entity) => entity.update());
    }
}
