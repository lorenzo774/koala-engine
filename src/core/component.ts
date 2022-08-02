import { Entity } from "./entity.js";

export abstract class Component {
    constructor(protected entity: Entity) {}

    draw(ctx: CanvasRenderingContext2D) {}
    update() {}
}
