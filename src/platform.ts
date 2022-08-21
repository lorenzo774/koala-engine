import { AudioManager } from "./core/audio/audio-manager.js";
import { Game } from "./core/game.js";
import { Background } from "./demo/background.js";
import { Player } from "./demo/player/player.js";
import { RigidBox } from "./demo/rigidBox.js";
import { World } from "./demo/world/world.js";

export class Platform extends Game {
    protected init() {
        this.entities = [
            new Background(),
            new World(),
            new Player(),
            new RigidBox(),
        ];
        AudioManager.load("../assets/audio/jump.wav", "jump", false, 1);
        AudioManager.load("../assets/audio/walk.wav", "walk", true, 1, 2.3);
    }
}
