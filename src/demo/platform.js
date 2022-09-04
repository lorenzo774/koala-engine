"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Platform = void 0;
const audio_manager_js_1 = require("../core/audio/audio-manager.js");
const game_js_1 = require("../core/game.js");
const background_js_1 = require("./world/background.js");
const player_js_1 = require("./player/player.js");
const world_js_1 = require("./world/world.js");
const scene_js_1 = require("../core/scene.js");
class Platform extends game_js_1.Game {
    init() {
        scene_js_1.Scene.add(new scene_js_1.Scene([new background_js_1.Background(), new world_js_1.World(), new player_js_1.Player()], "main"));
        scene_js_1.Scene.add(new scene_js_1.Scene([new world_js_1.World()], "bg"));
        scene_js_1.Scene.add(new scene_js_1.Scene([new background_js_1.Background(), new world_js_1.World()], "bg-world"));
        scene_js_1.Scene.load("main");
        audio_manager_js_1.AudioManager.load("../assets/audio/jump.wav", "jump", false, 1);
        audio_manager_js_1.AudioManager.load("../assets/audio/walk.wav", "walk", true, 1, 2.3);
    }
}
exports.Platform = Platform;
