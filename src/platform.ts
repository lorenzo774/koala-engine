import { Game } from "./core/game.js";
import { Background } from "./objects/background.js";
import { World } from "./objects/world/world.js";

export class Platform extends Game {
    protected init() {
        this.entities = [
            new Background(),
            new World(),
            // new AnotherBox(),
            // new Player(),
        ];
    }
}
