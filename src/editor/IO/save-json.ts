import { settings } from "./settings.js";

export async function saveJson<T>(data: T) {
    // @ts-ignore
    const [fileHandle] = await window.showSaveFilePicker(settings);
    if(fileHandle.kind === "file") {
        const writableStream = await fileHandle.createWritable();
        await writableStream.write(JSON.stringify(data));
        await writableStream.close();
    }
    return null;
}