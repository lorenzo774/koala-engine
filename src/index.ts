import { Game } from "./game.js";
import { Settings } from "./settings.js";

const canvas = document.querySelector("#canvas") as HTMLCanvasElement;
const context = canvas.getContext("2d");

// Set canvas size
Settings.WIDTH = canvas.width = window.innerWidth;
Settings.HEIGHT = canvas.height = window.innerHeight;

// Draw test
const game = new Game(context);
