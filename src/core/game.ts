import { Entity } from "./entity.js";
import { Settings } from "../settings.js";
import { CollisionSystem } from "./collision-system.js";

export abstract class Game {
    private collisionSystem: CollisionSystem;
    protected entities: Entity[] = [];

    constructor(private ctx: CanvasRenderingContext2D) {
        this.init();
        this.collisionSystem = new CollisionSystem(this.entities);
        // this.entities.forEach((entity) => entity.start());
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
        this.collisionSystem.checkCollisions();
        this.update();
        this.draw();
        if (Settings.DEBUG_MODE) {
            this.debugger();
        }
        requestAnimationFrame(this.runLoop.bind(this));
    }

    private debugger() {
        this.entities.forEach((entity) => entity.debugDraw(this.ctx));
    }

    private draw() {
        this.ctx.clearRect(0, 0, Settings.WIDTH, Settings.HEIGHT);
        this.entities.forEach((entity) => entity.draw(this.ctx));
    }

    private update() {
        this.entities.forEach((entity) => entity.update());
    }
}
