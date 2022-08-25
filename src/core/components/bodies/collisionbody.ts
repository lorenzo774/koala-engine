import { Component } from "../../component.js";
import { Entity } from "../../entity.js";
import { Vector2 } from "../../math/vector2.js";
import { Transform } from "../transform.js";
import { Rect } from "../../utils/rect.js";

export abstract class CollisionBody extends Component {
    private _collisionEventHandler: (CollisionBody) => void;
    private _triggerEventHandler: (CollisionBody) => void;

    protected transform: Transform;

    public position: Vector2;

    /**
     * @param callback Called on solid collision
     */
    public set collisionEventHandler(callback: (CollisionBody) => void) {
        this._collisionEventHandler = callback;
    }

    /**
     * @param callback Called on not solid collision
     */
    public set triggerEventHandler(callback: (CollisionBody) => void) {
        this._triggerEventHandler = callback;
    }

    constructor(entity: Entity, public solid: boolean = true) {
        super(entity);
        this.transform = entity.getComponent<Transform>(Transform);
    }

    public abstract getCollisions(): IterableIterator<Rect>;

    public start() {
        this.position = Vector2.ZERO;
        this.position = this.transform.position;
    }

    /**
     * Called when the body is in collision with a solid body
     */
    public onCollision(otherBody: CollisionBody) {
        if(!this._collisionEventHandler) return;
        this._collisionEventHandler(otherBody);
    }

    /**
     * Called when the body is in collision with a not solid body
     */
    public onTrigger(otherBody: CollisionBody) {
        if(!this._triggerEventHandler) return;
        this._triggerEventHandler(otherBody);
    }
}

