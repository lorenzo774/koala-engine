"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scene = void 0;
class Scene {
    _entities;
    _name;
    static _scenes = [];
    static _main;
    static get main() {
        return Scene._main;
    }
    get name() {
        return this._name;
    }
    static get scenes() {
        return Scene._scenes;
    }
    get entities() {
        return this._entities;
    }
    constructor(_entities, _name) {
        this._entities = _entities;
        this._name = _name;
    }
    static findScene(name) {
        return Scene._scenes.find((scene) => scene._name === name);
    }
    static add(scene) {
        if (!scene)
            return;
        if (Scene.findScene(scene.name))
            return;
        if (scene.entities.length === 0)
            return;
        if (!scene.name)
            return;
        Scene._scenes.push(scene);
    }
    static load(name) {
        if (!name)
            return;
        if (Scene._scenes.length === 0)
            return;
        const scene = Scene.findScene(name);
        if (!scene)
            return;
        Scene._main = scene;
    }
    static findEntity(name) {
        return Scene.main.entities.find((entity) => entity.name === name);
    }
}
exports.Scene = Scene;
