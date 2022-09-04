"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Editor = void 0;
const game_js_1 = require("../core/game.js");
const background_js_1 = require("./background.js");
const scene_js_1 = require("../core/scene.js");
const editor_systems_js_1 = require("./systems/editor-systems.js");
class Editor extends game_js_1.Game {
    init() {
        scene_js_1.Scene.add(new scene_js_1.Scene([
            new editor_systems_js_1.EditorSystems(),
            new background_js_1.Background(),
        ], "main"));
        scene_js_1.Scene.load("main");
    }
}
exports.Editor = Editor;
