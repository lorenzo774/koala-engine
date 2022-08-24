import { Settings } from "../settings/settings.js";
import { Entity } from "../entity.js";
import { Scene } from "../scene.js";

export class UIDebug {
    // Singleton
    private static i: UIDebug;
    public static get I() {
        if (!UIDebug.i) {
            UIDebug.i = new UIDebug();
        }
        return UIDebug.i;
    }

    private entityList: HTMLUListElement = document.querySelector("#ui-entity");
    private sceneLbl: HTMLElement = document.querySelector("#debug-scene-name");
    private fpsLbl: HTMLElement = document.querySelector("#fps");
    private toggleDebugUI: HTMLButtonElement =
        document.querySelector("#toggle-debug-mode");

    constructor() {
        if (!this.toggleDebugUI) return;
        this.toggleDebugUI.addEventListener("click", (_) => {
            Settings.main.DEBUG_MODE = !Settings.main.DEBUG_MODE;
            this.toggleDebugUI.textContent = Settings.main.DEBUG_MODE ? "ON" : "OFF";
            this.toggleDebugUI.classList.toggle("on");
            this.toggleDebugUI.classList.toggle("off");
        });
    }

    public showDebugUI() {
        document.querySelectorAll(".ui-debug").forEach((el) => {
            el.classList.remove("hide");
        });
    }

    public run(entities: Entity[], fps: number) {
        this.sceneLbl.textContent = `Scene: ${Scene.main.name}`;
        this.fpsLbl.textContent = `FPS: ${fps.toFixed(0)}`;
        this.entityList.innerHTML = entities
            .map((entity) => `<li> - ${entity.name}</li>`)
            .join("");
    }
}
