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

    showDebugUI() {
        document.querySelector("#ui-debug").classList.remove("hide");
    }

    public run(entities: Entity[]) {
        this.entityList.innerHTML = entities
            .map((entity) => `<li> - ${entity.name}</li>`)
            .join("");
    }
}
