import { Transform } from "./components/transform.js";
import { Component } from "./component.js";

export abstract class Entity {
    constructor(public name: string, private components: Component[] = []) {
        this.addComponent(new Transform(this));
    }

    start() {}

    init(components: Component[]) {
        this.components = components;
    }

    addComponent(newComponent: Component): Component {
        this.components.push(newComponent);
        return newComponent;
    }

    getComponent<T extends Component>(component: typeof Component): T {
        return this.components.find((c) => c instanceof component) as T;
    }

    draw(ctx: CanvasRenderingContext2D) {
        this.components.forEach((component) => {
            component.draw(ctx);
        });
    }

    update() {
        this.components.forEach((component) => {
            component.update();
        });
    }
}
