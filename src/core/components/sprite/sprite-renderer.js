"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpriteRenderer = void 0;
const vector2_js_1 = require("../../math/vector2.js");
const component_js_1 = require("../../component.js");
const image_rect_js_1 = require("./image-rect.js");
const transform_js_1 = require("../transform.js");
const camera_js_1 = require("../camera.js");
class SpriteRenderer extends component_js_1.Component {
    texture;
    fixedPosition;
    imgRect;
    size;
    offset;
    transform;
    flipH = false;
    constructor(entity, texture = null, fixedPosition = false, imgRect = new image_rect_js_1.ImageRect(vector2_js_1.Vector2.ZERO, new vector2_js_1.Vector2(texture.width, texture.height)), size = new vector2_js_1.Vector2(texture.width, texture.height), offset = vector2_js_1.Vector2.ZERO) {
        super(entity);
        this.texture = texture;
        this.fixedPosition = fixedPosition;
        this.imgRect = imgRect;
        this.size = size;
        this.offset = offset;
        this.transform = entity.getComponent(transform_js_1.Transform);
    }
    drawHorizontalFlip(ctx) {
        ctx.translate(this.transform.position.x + this.size.x, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(this.texture, this.imgRect.position.x, this.imgRect.position.y, this.imgRect.size.x - 0.1, this.imgRect.size.y - 0.1, camera_js_1.Camera.position.x, this.transform.position.y + this.offset.y - camera_js_1.Camera.position.y, this.size.x, this.size.y);
        ctx.setTransform(1, 0, 0, 1, 0, 0);
    }
    start() { }
    update() { }
    draw(ctx) {
        if (!this.texture)
            return;
        if (this.flipH) {
            this.drawHorizontalFlip(ctx);
        }
        else {
            ctx.drawImage(this.texture, this.imgRect.position.x, this.imgRect.position.y, this.imgRect.size.x, this.imgRect.size.y, this.transform.position.x +
                this.offset.x -
                (this.fixedPosition ? 0 : camera_js_1.Camera.position.x), this.transform.position.y -
                this.offset.y -
                (this.fixedPosition ? 0 : camera_js_1.Camera.position.y), this.size.x, this.size.y);
        }
    }
}
exports.SpriteRenderer = SpriteRenderer;
