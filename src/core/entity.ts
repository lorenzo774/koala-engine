import { Transform } from "./components/transform.js";
import { Component } from "./component.js";
import { CollisionBody } from "./components/bodies/collisionbody.js";

export abstract class Entity {
    public get components() {
        return this._components;
    }

    protected set components(value: Component[]) {
        // Start components
        this._components = [...this._components, ...value];
    }

    constructor(public name: string, private _components: Component[] = []) {
        this.addComponent(new Transform(this));
        this.init();
        this.start();
        this._components.forEach((component) => component.start());
        this.startComponents();
    }

    private startComponents() {
        this._components.forEach((component) => component.start());
    }

    /**
     * For initialization
     */
    protected init() {}

    /**
     * On start or reload
     */
    public start() {}

    private addComponent(newComponent: Component): Component {
        this._components.push(newComponent);
        return newComponent;
    }

    public getComponent<T extends Component>(component: typeof Component): T {
        return this._components.find((c) => c instanceof component) as T;
    }

    public getBody<T extends CollisionBody>(
        component: typeof CollisionBody
    ): T {
        return this._components.find((c) => c instanceof CollisionBody) as T;
    }

    public draw(ctx: CanvasRenderingContext2D) {
        this._components.forEach((component) => {
            component.draw(ctx);
        });
    }

    public debugDraw(ctx: CanvasRenderingContext2D): void {
        this._components.forEach((component) => {
            component.debugDraw(ctx);
        });
    }

    public update() {
        this._components.forEach((component) => {
            component.update();
        });
    }

    public physicsUpdate() {
        this._components.forEach((component) => {
            component.physicsUpdate();
        });
    }
}
