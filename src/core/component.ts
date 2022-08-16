import { Entity } from "./entity.js";

export abstract class Component {
    constructor(protected entity: Entity) {}

    public start() {}
    public draw(ctx: CanvasRenderingContext2D) {}
    public debugDraw(ctx: CanvasRenderingContext2D) {}
    public update() {}
}
