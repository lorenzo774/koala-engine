import { Game } from "../core/game.js";
import {Background} from "./background.js";
import { Scene } from "../core/scene.js";

export class Editor extends Game {
    protected init() {
        Scene.add(new Scene([new Background()], "main"));
        Scene.load("main");
    }
}
