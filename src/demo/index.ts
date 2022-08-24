import { Platform } from "./platform.js";
import { Settings } from "../core/settings/settings.js";
import { getPlatformSettings } from "./platform-settings.js";

const canvas = document.querySelector("#canvas") as HTMLCanvasElement;
const context = canvas.getContext("2d");
context.imageSmoothingEnabled = true;

// Load game settings
const platformSettings = getPlatformSettings(canvas);
Settings.loadSettings(platformSettings);

// START
new Platform(canvas, context);