import { Entity } from "../entity";

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
    private fpsLbl: HTMLElement = document.querySelector("#fps");

    showDebugUI() {
        document.querySelector("#ui-debug").classList.remove("hide");
    }

    public run(entities: Entity[], fps: number) {
        this.fpsLbl.textContent = `FPS: ${fps}`;
        this.entityList.innerHTML = entities
            .map((entity) => `<li> - ${entity.name}</li>`)
            .join("");
    }
}
