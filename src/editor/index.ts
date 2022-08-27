import { Editor } from "./editor.js";
import { loadProject } from "../loader/load-project.js";
import { loadJson } from "./IO/load-json.js";

const canvas = document.querySelector("#canvas") as HTMLCanvasElement;
const context: CanvasRenderingContext2D = canvas.getContext("2d");
// File System Access API works on user input
canvas.addEventListener("click", async (_) => {
    const settingsBlob: string = await loadJson();
    loadProject(settingsBlob, "", "", "");
    // START
    new Editor(canvas, context);
});
