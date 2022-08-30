import { Entity } from "./entity.js";

export abstract class Component {
    constructor(public entity: Entity) {}

    public start() {}

    public draw(ctx: CanvasRenderingContext2D) {}

    public debugDraw(ctx: CanvasRenderingContext2D) {}

    public update() {}

    public physicsUpdate() {}
}
