import { GameSettings } from "./game-settings.js";

/**
 * Game Settings loader
 */
export class Settings {
    private static _main: GameSettings;
    public static get main(): GameSettings {
        return Settings._main;
    }
    public static loadSettings(settings: GameSettings) {
        Settings._main = settings;
    }
}
