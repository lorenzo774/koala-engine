import { Input } from "./core/input.js";
import { Game } from "./game.js";
import { Settings } from "./settings.js";

const canvas = document.querySelector("#canvas") as HTMLCanvasElement;
const context = canvas.getContext("2d");

// Set canvas size
const setSize = function () {
    Settings.WIDTH = canvas.width = window.innerWidth;
    Settings.HEIGHT = canvas.height = window.innerHeight;
    context.imageSmoothingEnabled = false;
};
setSize();
window.onresize = setSize;

Input.listen();

// Draw test
new Game(context);
