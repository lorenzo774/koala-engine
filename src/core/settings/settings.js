"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Settings = void 0;
class Settings {
    static _main;
    static get main() {
        return Settings._main;
    }
    static loadSettings(settings) {
        Settings._main = settings;
    }
}
exports.Settings = Settings;
