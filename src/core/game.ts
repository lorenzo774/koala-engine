import { Entity } from "./entity.js";
import { Settings } from "../settings.js";
import { PhysicsEngine } from "./physics/physics-engine.js";
import { UIDebug } from "./display/ui-debug.js";
import { Renderer } from "./display/renderer.js";

export abstract class Game {
    private renderer: Renderer;
    private physicsEngine: PhysicsEngine;

    protected entities: Entity[] = [];

    constructor(ctx: CanvasRenderingContext2D) {
        this.init();
        this.renderer = new Renderer(ctx, this.entities);
        this.physicsEngine = new PhysicsEngine(this.entities);
        this.physicsEngine.init();

        if (Settings.DEBUG_MODE) {
            UIDebug.I.showDebugUI();
        }
        setInterval(this.runLoop.bind(this), 1000 / Settings.FPS);
        this.runLoop();
    }

    private runLoop() {
        this.renderer.run();
    }

    /**
     *  Virtual method, this method will be called on children to initialize entities
     */
    protected init() {}

    public reload() {
        this.entities.forEach((entity) => entity.start());
    }
}
