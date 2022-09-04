"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const settings_js_1 = require("./settings/settings.js");
const physics_engine_js_1 = require("./physics/physics-engine.js");
const ui_debug_js_1 = require("./display/ui-debug.js");
const renderer_js_1 = require("./display/renderer.js");
const keyboard_input_js_1 = require("./input/keyboard-input.js");
const mouse_input_js_1 = require("./input/mouse-input.js");
const vector2_js_1 = require("./math/vector2.js");
const scene_js_1 = require("./scene.js");
class Game {
    _updateEventCallback;
    renderer;
    physicsEngine;
    entities = [];
    set updateEventCallback(call) {
        this._updateEventCallback = call;
    }
    constructor(canvas, ctx) {
        this.listenWindowEvents(canvas, ctx);
        this.init();
        if (scene_js_1.Scene.scenes.length === 0) {
            alert("You need to create a scene!");
            return;
        }
        this.loadScene();
        this.initEntities();
        this.renderer = new renderer_js_1.Renderer(ctx, this.entities);
        this.physicsEngine = new physics_engine_js_1.PhysicsEngine(this.entities);
        this.physicsEngine.init();
        if (settings_js_1.Settings.main.DEBUG_MODE) {
            ui_debug_js_1.UIDebug.I.showDebugUI();
        }
        this.update();
    }
    update() {
        console.log(this);
        this.renderer.run();
        if (!this._updateEventCallback)
            return;
        this._updateEventCallback();
    }
    listenWindowEvents(canvas, ctx) {
        const setSize = function () {
            settings_js_1.Settings.main.WIDTH = canvas.width = window.innerWidth;
            settings_js_1.Settings.main.HEIGHT = canvas.height = window.innerHeight;
            settings_js_1.Settings.main.SCREEN_SIZE = new vector2_js_1.Vector2(canvas.width, canvas.height);
            ctx.imageSmoothingEnabled = false;
        };
        setSize();
        window.onresize = setSize;
        keyboard_input_js_1.Keyboard.listen();
        mouse_input_js_1.MouseInput.listen();
    }
    loadScene() {
        this.entities = scene_js_1.Scene.main.entities;
    }
    initEntities() {
        this.entities.forEach(entity => entity.load());
    }
    init() { }
}
exports.Game = Game;
