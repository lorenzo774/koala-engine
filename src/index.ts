import { Vector2 } from "./core/math/vector2.js";
import { Input } from "./core/systems/input-system.js";
import { MouseInput } from "./core/systems/mouse-input-system.js";
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

// Listen to events
window.onresize = setSize;
Input.listen();
MouseInput.listen();

new Platform(context);
