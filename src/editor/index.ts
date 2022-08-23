import { Settings } from "../core/settings/settings.js";
import { getEditorSettings } from "./editor-settings.js";
import { Editor } from "./editor.js";

const canvas = document.querySelector("#canvas") as HTMLCanvasElement;
const context = canvas.getContext("2d");

// Load settings
const editorSettings = getEditorSettings(canvas);
Settings.loadSettings(editorSettings);

// START
new Editor(canvas, context);