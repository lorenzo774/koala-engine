import { AudioManager } from "../core/audio/audio-manager.js";
import { Game } from "../core/game.js";
import { Background } from "./world/background.js";
import { Player } from "./player/player.js";
import { World } from "./world/world.js";
import { Scene } from "../core/scene.js";

export class Platform extends Game {
    protected init() {
        // MAIN SCENE
        Scene.add(
            new Scene([new Background(), new World(), new Player()], "main")
        );
        // SECOND SCENE
        Scene.add(new Scene([new World()], "bg"));
        // THIRD SCENE
        Scene.add(new Scene([new Background(), new World()], "bg-world"));

        // LOAD SCENE
        Scene.load("main");

        // AUDIO
        AudioManager.load("../assets/audio/jump.wav", "jump", false, 1);
        AudioManager.load("../assets/audio/walk.wav", "walk", true, 1, 2.3);
    }
}
