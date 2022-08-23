import { Entity } from "../../entity.js";
import { CollisionBody } from "./collisionbody.js";
import { Tilemap } from "../tilemap/tilemap.js";
import { Rect } from "../../utils/rect.js";
import { Vector2 } from "../../math/vector2.js";
import { TILEMAP_RENDERING_VALUE } from "../../const.js";

export class TilemapBody extends CollisionBody {
    private collisions: Rect[];

    constructor(
        entity: Entity,
        private tilemap: Tilemap = new Tilemap(entity)
    ) {
        super(entity);
        this.collisions = this.tilemap
            .getIndividualRects()
            .map(
                (rect) =>
                    new Rect(
                        Vector2.multiply(
                            rect.position,
                            Vector2.multiplyBy(
                            tilemap.tileset.worldSize, TILEMAP_RENDERING_VALUE)
                        ),
                        Vector2.multiplyBy(Vector2.multiply(rect.size, tilemap.tileset.worldSize), TILEMAP_RENDERING_VALUE)
                    )
            );
    }

    public onCollision() {}

    public *getCollisions(): IterableIterator<Rect> {
        for (const rect of this.collisions) {
            yield rect;
        }
    }

    // String
    public toString = (): string => {
        return `TilemapBody of ${this.entity.name}`;
    };
}
