import { Settings } from "./settings.js";

const canvas = document.querySelector("#canvas") as HTMLCanvasElement;
const context = canvas.getContext("2d");

// Set canvas size
Settings.WIDTH = canvas.width = window.innerWidth;
Settings.HEIGHT = canvas.height = window.innerHeight;

// Draw test
function draw() {
    context.fillStyle = "red";
    context.fillRect(0, 0, Settings.WIDTH / 2, Settings.HEIGHT / 2);
}
requestAnimationFrame(draw);
