"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditorState = void 0;
class EditorState {
    context;
    stateFactory;
    constructor(context, stateFactory) {
        this.context = context;
        this.stateFactory = stateFactory;
        this.onStart();
    }
    onStart() { }
    changeState(newState) { }
    update() { }
}
exports.EditorState = EditorState;
