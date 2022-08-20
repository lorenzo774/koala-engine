import { Keyboard } from "./core/input/keyboard-input.js";
import { MouseInput } from "./core/input/mouse-input.js";
import { Platform } from "./platform.js";
import { Settings } from "./settings.js";

const canvas = document.querySelector("#canvas") as HTMLCanvasElement;
export const context = canvas.getContext("2d");

// Set canvas size
const setSize = function () {
    Settings.WIDTH = canvas.width = window.innerWidth;
    Settings.HEIGHT = canvas.height = window.innerHeight;
    context.imageSmoothingEnabled = false;
};
setSize();

// Listen to events
window.onresize = setSize;
Keyboard.listen();
MouseInput.listen();

// START
new Platform(context);
