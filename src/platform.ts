import { AudioManager } from "./core/audio/audio-manager.js";
import { Game } from "./core/game.js";
import { Background } from "./objects/background.js";
import { Box } from "./objects/box.js";
import { Player } from "./objects/player/player.js";
import { RigidBox } from "./objects/rigidBox.js";
import { World } from "./objects/world/world.js";

export class Platform extends Game {
    protected init() {
        this.entities = [
            new Background(),
            new World(),
            new Player(),
            new Box(),
            new RigidBox(),
        ];
        AudioManager.load("../assets/audio/jump.wav", "jump", false, 1);
        AudioManager.load("../assets/audio/walk.wav", "walk", true, 1, 2.3);
    }
}
