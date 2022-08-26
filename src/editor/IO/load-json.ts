import { settings } from "./settings.js";

export async function loadJson(): Promise<string> {
    // @ts-ignore
    const [fileHandle] = await window.showOpenFilePicker(settings);
    if(fileHandle.kind === "file") {
        const file = await fileHandle.getFile();
        const contents = await file.text();
        return JSON.stringify(contents);
    }
    return null;
}