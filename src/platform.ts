import { Game } from "./core/game.js";
import { Background } from "./environment/background.js";
import { Box } from "./environment/box.js";
import { Player } from "./player/player.js";

export class Platform extends Game {
    protected init() {
        this.entities = [new Background(), new Box(), new Player()];
    }
}
