import { Component } from "../component.js";
import { Vector2 } from "../math/vector2.js";
import { Entity } from "../entity.js";

export class Transform extends Component {
    constructor(
        entity: Entity,
        public position: Vector2 = Vector2.ZERO,
        public scale: Vector2 = Vector2.ONE
    ) {
        super(entity);
    }
}
