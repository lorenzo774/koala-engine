export function loadImage(path: string): HTMLImageElement {
    const img = new Image(0, 0);
    img.src = path;
    return img;
}
