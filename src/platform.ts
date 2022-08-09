import { Game } from "./core/game.js";
import { AnotherBox } from "./environment/anotherbox.js";
import { Background } from "./environment/background.js";
import { Box } from "./environment/box.js";
import { World } from "./environment/world.js";
import { Player } from "./player/player.js";

export class Platform extends Game {
    protected init() {
        this.entities = [
            new Background(),
            new World(),
            // new Box(),
            // new AnotherBox(),
            // new Player(),
        ];
    }
}
