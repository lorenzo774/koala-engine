"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhysicsEngine = void 0;
const settings_js_1 = require("../settings/settings.js");
const rigidbody_js_1 = require("../components/bodies/rigidbody.js");
const staticbody_js_1 = require("../components/bodies/staticbody.js");
const tilemapbody_js_1 = require("../components/bodies/tilemapbody.js");
const vector2_js_1 = require("../math/vector2.js");
const swept_functions_js_1 = require("./swept-functions.js");
class PhysicsEngine {
    entities;
    rigidBodiesCollisions;
    constructor(entities) {
        this.entities = entities;
    }
    getBody(entity) {
        for (const component of entity.components) {
            if (component instanceof rigidbody_js_1.RigidBody) {
                return component;
            }
            if (component instanceof staticbody_js_1.StaticBody) {
                return component;
            }
            if (component instanceof tilemapbody_js_1.TilemapBody) {
                return component;
            }
        }
        return null;
    }
    checkCollisions() {
        for (const entity of this.entities) {
            let body = this.getBody(entity);
            if (!body)
                continue;
            if (body instanceof staticbody_js_1.StaticBody)
                continue;
            if (body instanceof tilemapbody_js_1.TilemapBody)
                continue;
            body = body;
            const rigidBodyCollisions = new Array();
            for (const otherEntity of this.entities) {
                if (otherEntity.name === entity.name)
                    continue;
                const otherBody = this.getBody(otherEntity);
                if (!otherBody)
                    continue;
                if (otherBody instanceof rigidbody_js_1.RigidBody)
                    continue;
                for (const rect of otherBody.getCollisions()) {
                    let collision = { collision: false };
                    for (const rigidBodyCol of body.getCollisions()) {
                        collision = (0, swept_functions_js_1.dynamicRectVsRect)(rigidBodyCol, rect);
                        if (!collision.collision) {
                            body.lastContactNormal = vector2_js_1.Vector2.ZERO;
                            continue;
                        }
                        collision.body = otherBody;
                        if (otherBody.solid) {
                            body.onCollision(otherBody);
                            otherBody.onCollision(body);
                        }
                        else {
                            body.onTrigger(otherBody);
                            otherBody.onTrigger(body);
                        }
                        rigidBodyCollisions.push(collision);
                    }
                }
            }
            this.rigidBodiesCollisions.set(body, rigidBodyCollisions.sort((a, b) => a.tHitNear - b.tHitNear));
        }
    }
    resolveCollisions() {
        for (const [rigidBody, collisions,] of this.rigidBodiesCollisions.entries()) {
            for (const collision of collisions) {
                if (!collision.body.solid)
                    continue;
                rigidBody.lastContactNormal = collision.contactNormal;
                rigidBody.velocity = vector2_js_1.Vector2.add(rigidBody.velocity, vector2_js_1.Vector2.multiplyBy(vector2_js_1.Vector2.multiply(collision.contactNormal, new vector2_js_1.Vector2(Math.abs(rigidBody.velocity.x), Math.abs(rigidBody.velocity.y))), 1 - collision.tHitNear));
            }
        }
    }
    run() {
        this.rigidBodiesCollisions = new Map();
        this.entities.forEach((entity) => entity.update());
        this.checkCollisions();
        this.resolveCollisions();
        this.entities.forEach((entity) => {
            entity.physicsUpdate();
        });
    }
    init() {
        setInterval(this.run.bind(this), 1 / settings_js_1.Settings.main.PHYSICS_CYCLES_PER_SECONDS);
    }
}
exports.PhysicsEngine = PhysicsEngine;
