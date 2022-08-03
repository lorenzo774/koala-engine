import { Input } from "./core/input.js";
import { Platform } from "./platform.js";
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

// Events
window.onresize = setSize;
Input.listen();

new Platform(context);
