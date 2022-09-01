import { Entity } from "./entity.js";
import { Settings } from "./settings/settings.js";
import { PhysicsEngine } from "./physics/physics-engine.js";
import { UIDebug } from "./display/ui-debug.js";
import { Renderer } from "./display/renderer.js";
import { Keyboard } from "./input/keyboard-input.js";
import { MouseInput } from "./input/mouse-input.js";
import { Vector2 } from "./math/vector2.js";
import { Scene } from "./scene.js";

export class Game {
    private _updateEventCallback: () => void;
    private renderer: Renderer;
    private physicsEngine: PhysicsEngine;
    protected entities: Entity[] = [];

    public set updateEventCallback(call: () => void) {
        this._updateEventCallback = call;
    }

    /**
     * Start game
     */
    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        this.listenWindowEvents(canvas, ctx);
        this.init();
        // The game could not start without scenes
        if(Scene.scenes.length === 0) {
            alert("You need to create a scene!");
            return;
        }
        this.loadScene();
        this.initEntities();
        this.renderer = new Renderer(ctx, this.entities);
        this.physicsEngine = new PhysicsEngine(this.entities);
        this.physicsEngine.init();
        if (Settings.main.DEBUG_MODE) {
            UIDebug.I.showDebugUI();
        }
        this.update();
    }

    private update() {
        console.log(this);
        this.renderer.run();
        if(!this._updateEventCallback) return;
        this._updateEventCallback();
    }

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

    private loadScene() {
        this.entities = Scene.main.entities;
    }

    private initEntities() {
        this.entities.forEach(entity => entity.load());
    }

    /**
     *  Virtual method, this method will be called on children to initialize scenes and entities
     */
    protected init() {}
}
