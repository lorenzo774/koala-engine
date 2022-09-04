"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Debug = void 0;
class Debug {
    static debugEl = document.querySelector("#debug");
    static clear() {
        Debug.debugEl.innerHTML = "";
    }
    static write(msg) {
        Debug.debugEl.innerHTML += `${msg}<br />`;
    }
}
exports.Debug = Debug;
