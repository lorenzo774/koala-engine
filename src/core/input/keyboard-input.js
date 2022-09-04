"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Keyboard = void 0;
const key_js_1 = require("./key.js");
class Keyboard {
    static keysPressed = [];
    static lastKey;
    static isPressed(key) {
        return this.keysPressed.includes(key);
    }
    static justPressed(key) {
        const nPressed = this.keysPressed.filter((k) => k === key).length;
        return nPressed < 2 && nPressed > 0 && this.lastKey === key;
    }
    static getKey(strKey) {
        if (strKey === " ")
            return key_js_1.Key.SPACE;
        return key_js_1.Key[`${strKey.toUpperCase()}`];
    }
    static listen() {
        window.addEventListener("keydown", (e) => {
            const key = this.getKey(e.key);
            this.keysPressed.push(key);
            this.lastKey = key;
        });
        window.addEventListener("keyup", (e) => {
            this.keysPressed = this.keysPressed.filter((key) => key !== this.getKey(e.key));
        });
    }
    static stop() {
        window.removeEventListener("keydown", (_) => {
            this.keysPressed.splice(0);
        });
        window.removeEventListener("keyup", (_) => {
            this.keysPressed.splice(0);
        });
    }
}
exports.Keyboard = Keyboard;
