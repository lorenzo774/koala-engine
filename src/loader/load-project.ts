import { GameSettings } from "../core/settings/game-settings.js";
import { Settings } from "../core/settings/settings.js";

export function loadProject(
    settingsBlob: string,
    gameBlob: string,
    scenesBlob: string,
    audiosBlob: string
) {
    loadSettings(settingsBlob);
}

function loadSettings(settingsBlob: string) {
    const settings = JSON.parse(JSON.parse(settingsBlob)) as GameSettings;
    Settings.loadSettings(settings);
}

export function parseJSON<T>(data: T): string {
    return JSON.stringify(data);
}