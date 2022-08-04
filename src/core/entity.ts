import { Transform } from "./components/transform.js";
import { Component } from "./component.js";

export abstract class Entity {
    public get components() {
        return this._components;
    }

    protected set components(value: Component[]) {
        this._components = [...this._components, ...value];
    }

    constructor(public name: string, private _components: Component[] = []) {
        this.addComponent(new Transform(this));
        this.init();
        this.startComponents();
    }

    private startComponents() {
        this._components.forEach((component) => component.start());
    }

    /**
     * On start or reload
     */
    start() {}

    /**
     * For initialization
     */
    protected init() {}

    private addComponent(newComponent: Component): Component {
        this._components.push(newComponent);
        return newComponent;
    }

    getComponent<T extends Component>(component: typeof Component): T {
        return this._components.find((c) => c instanceof component) as T;
    }

    draw(ctx: CanvasRenderingContext2D) {
        this._components.forEach((component) => {
            component.draw(ctx);
        });
    }

    update() {
        this._components.forEach((component) => {
            component.update();
        });
    }
}
