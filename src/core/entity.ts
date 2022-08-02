import { Component } from "./component.js";

export abstract class Entity {
    constructor(public name: string, private components: Component[]) {}

    addComponent(newComponent: Component) {
        this.components.push(newComponent);
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
