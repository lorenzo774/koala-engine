import { Entity } from "./entity.js";
import { Settings } from "./settings/settings.js";
import { PhysicsEngine } from "./physics/physics-engine.js";
import { UIDebug } from "./display/ui-debug.js";
import { Renderer } from "./display/renderer.js";
import { Keyboard } from "./input/keyboard-input.js";
import { MouseInput } from "./input/mouse-input.js";
import { Vector2 } from "./math/vector2.js";

export class Game {
    private renderer: Renderer;
    private physicsEngine: PhysicsEngine;
    protected entities: Entity[] = [];

    private runLoop() {
        this.renderer.run();
    }

    /**
     *  Virtual method, this method will be called on children to initialize entities
     */
    protected init() {}

    /**
     * Listen to input and window events
     */
    private listenWindowEvents(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        // Set canvas size
        const setSize = function () {
            Settings.main.WIDTH = canvas.width = window.innerWidth;
            Settings.main.HEIGHT = canvas.height = window.innerHeight;
            Settings.main.SCREEN_SIZE = new Vector2(canvas.width, canvas.height);
            ctx.imageSmoothingEnabled = false;
        };
        setSize();
        // Listen to events
        window.onresize = setSize;
        Keyboard.listen();
        MouseInput.listen();
    }

    /**
     * Start game
     */
    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        this.listenWindowEvents(canvas, ctx);
        this.init();
        this.renderer = new Renderer(ctx, this.entities);
        this.physicsEngine = new PhysicsEngine(this.entities);
        this.physicsEngine.init();
        if (Settings.main.DEBUG_MODE) {
            UIDebug.I.showDebugUI();
        }
        this.runLoop();
    }

    public reload() {
        this.entities.forEach((entity) => entity.start());
    }

    /**
     * Find an entity by its name
     */
    public findEntity<T extends Entity>(name: string): T {
        return this.entities.find(
            (entity: Entity) => entity.name === name
        ) as T;
    }
}
