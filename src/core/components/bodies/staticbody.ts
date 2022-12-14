import { Entity } from "../../entity.js";
import { Vector2 } from "../../math/vector2.js";
import { CollisionBody } from "./collisionbody.js";
import { Rect } from "../../utils/rect.js";
import { Settings } from "../../settings/settings.js";
import { Camera } from "../camera.js";

export class StaticBody extends CollisionBody {
    constructor(
        entity: Entity,
        private collisionBox: Rect = new Rect(
            Vector2.ZERO,
            new Vector2(100, 100)
        ),
        solid: boolean = true
    ) {
        super(entity, solid);
    }

    public *getCollisions(): IterableIterator<Rect> {
        yield new Rect(
            Vector2.add(this.transform.position, this.collisionBox.position),
            this.collisionBox.size
        );
    }

    public update() {
        this.position.x =
            this.transform.position.x + this.collisionBox.position.x;
        this.position.y =
            this.transform.position.y + this.collisionBox.position.y;
    }

    public debugDraw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = Settings.main.DEBUG_COLOR;
        ctx.fillRect(
            this.transform.position.x +
                this.collisionBox.position.x -
                Camera.position.x,
            this.transform.position.y +
                this.collisionBox.position.y -
                Camera.position.y,
            this.collisionBox.size.x,
            this.collisionBox.size.y
        );
    }

    // String
    public toString = (): string => {
        return `StaticBody of ${this.entity.name}`;
    };
}
