import { Entity } from "./entity.js";

/**
 * All the scenes are here, you can add or load an existing scene
 */
export class Scene {
    private static _scenes: Scene[] = [];
    private static _main: Scene;

    public static get main(): Scene {
        return Scene._main;
    }

    public get name(): string {
        return this._name;
    }

    public static get scenes(): Scene[] {
        return Scene._scenes;
    }

    public get entities(): Entity[] {
        return this._entities;
    }

    constructor(private _entities: Entity[], private _name: string) {}

    private static findScene(name: string) {
        return Scene._scenes.find((scene) => scene._name === name);
    }

    public static add(scene: Scene) {
        if (!scene) return;
        if (Scene.findScene(scene.name)) return;
        if (scene.entities.length === 0) return;
        if (!scene.name) return;

        Scene._scenes.push(scene);
    }

    public static load(name: string) {
        if (!name) return;
        if (Scene._scenes.length === 0) return;
        const scene = Scene.findScene(name);
        if (!scene) return;

        Scene._main = scene;
    }

    /**
     * Find an entity by its name
     */
    public static findEntity(name: string): Entity {
        return Scene.main.entities.find(
            (entity: Entity) => entity.name === name
        );
    }
}