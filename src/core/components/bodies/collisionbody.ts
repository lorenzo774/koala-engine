import { Component } from "../../component.js";
import { Entity } from "../../entity.js";
import { Vector2 } from "../../math/vector2.js";
import { Transform } from "./../transform.js";
import { Rect } from "../../utils/rect.js";

export abstract class CollisionBody extends Component {
    protected transform: Transform;
    public position: Vector2;

    constructor(entity: Entity) {
        super(entity);
        this.transform = entity.getComponent<Transform>(Transform);
    }

    public abstract getCollisions(): IterableIterator<Rect>;

    public start() {
        this.position = Vector2.ZERO;
        this.position = this.transform.position;
    }

    /**
     * Called when the body is in collision with another
     */
    public onCollision() {}
}
