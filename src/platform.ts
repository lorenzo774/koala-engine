import { Game } from "./core/game.js";
import { Player } from "./player/player.js";

export class Platform extends Game {
    protected init() {
        this.entities = [new Player()];
    }
}
