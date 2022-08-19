import { Settings } from "../../settings.js";
import { Component } from "../component.js";
import { Entity } from "../entity.js";
import { Vector2 } from "../math/vector2.js";
import { Transform } from "./transform.js";

export class Camera extends Component {
    public position: Vector2;

    private static _main: Camera;
    /**
     * Get main camera
     */
    public static get main(): Camera {
        return Camera._main;
    }
    public static setMainCamera(camera: Camera) {
        Camera._main = camera;
    }

    /**
     * Create a new camera
     */
    constructor(entity: Entity, private transformToFollow: Transform) {
        super(entity);
        this.position = transformToFollow.position;
    }

    public update() {
        this.position = Vector2.subtract(
            this.transformToFollow.position,
            Vector2.divideBy(Settings.SCREEN_SIZE, 2)
        );
    }
}
