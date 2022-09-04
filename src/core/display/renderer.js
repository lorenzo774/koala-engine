"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Renderer = void 0;
const settings_js_1 = require("../settings/settings.js");
const time_js_1 = require("../utils/time.js");
const ui_debug_js_1 = require("./ui-debug.js");
class Renderer {
    ctx;
    entities;
    before;
    constructor(ctx, entities) {
        this.ctx = ctx;
        this.entities = entities;
        this.before = Date.now();
    }
    run() {
        const now = Date.now();
        const delta = (now - this.before) / 1000;
        if (delta >= 1 / settings_js_1.Settings.main.FPS) {
            time_js_1.Time.deltaTime = delta;
            this.draw();
            if (settings_js_1.Settings.main.DEBUG_MODE) {
                this.debugger();
            }
            this.before = now;
        }
        requestAnimationFrame(this.run.bind(this));
    }
    debugger() {
        this.entities.forEach((entity) => entity.debugDraw(this.ctx));
        ui_debug_js_1.UIDebug.I.run(this.entities, 1 / time_js_1.Time.deltaTime);
    }
    draw() {
        this.ctx.clearRect(0, 0, settings_js_1.Settings.main.WIDTH, settings_js_1.Settings.main.HEIGHT);
        this.entities.forEach((entity) => entity.draw(this.ctx));
    }
}
exports.Renderer = Renderer;
