export function loadImage(path: string): HTMLImageElement {
    const img = new Image();
    img.src = path;
    return img;
}

export async function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
