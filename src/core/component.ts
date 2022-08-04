import { Entity } from "./entity.js";

export abstract class Component {
    constructor(protected entity: Entity) {}

    start() {}
    draw(ctx: CanvasRenderingContext2D) {}
    debugDraw(ctx: CanvasRenderingContext2D) {}
    update() {}
}
