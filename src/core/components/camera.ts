import { Component } from "../component.js";
import { Entity } from "../entity.js";

export class Camera extends Component {
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
    constructor(
        entity: Entity,
        private entityToFollow: Entity,
        private entities: Entity[]
    ) {
        super(entity);
    }
}
