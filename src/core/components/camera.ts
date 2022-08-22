import { Settings } from "../settings/settings.js";
import { Component } from "../component.js";
import { Entity } from "../entity.js";
import { Vector2 } from "../math/vector2.js";
import { Transform } from "./transform.js";

export class Camera extends Component {
    /*
        STATIC INSTANCE
    */
    private static _main: Camera;
    public static get main(): Camera {
        return Camera._main;
    }
    public static set main(camera: Camera) {
        Camera._main = camera;
    }

    public position: Vector2;

    /**
     * Create a new camera component
     */
    constructor(
        entity: Entity,
        private transformToFollow: Transform,
        private startPosition: Vector2 = Vector2.ZERO,
        private followY: boolean = false
    ) {
        super(entity);
        this.position = this.getCameraPosition();
    }

    private getCameraPosition(): Vector2 {
        const cameraTransformDelta = (this.followY
            ? this.transformToFollow.position
            : new Vector2(this.transformToFollow.position.x, 0));
        return Vector2.add(cameraTransformDelta, this.startPosition);
    }

    public update() {
        this.position = Vector2.subtract(
            this.getCameraPosition(),
            Vector2.divideBy(Settings.main.SCREEN_SIZE, 2)
        );
    }
}
