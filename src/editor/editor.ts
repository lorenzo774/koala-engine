import { Game } from "../core/game.js";
import {Background} from "./background.js";

export class Editor extends Game {
    protected init() {
        this.entities = [
            new Background()
        ];
    }
}
