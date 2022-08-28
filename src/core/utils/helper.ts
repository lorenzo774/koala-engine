export function loadImage(path: string): HTMLImageElement {
    const img = new Image();
    img.src = path;
    return img;
}

export async function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Converts a string to PascalCase convention
 */
export function toPascalCase(value: string): string {
    let result = value;
    // Transform first character
    result = `${result[0].toUpperCase()}${result.slice(1)}`;
    // The string is not camelCase
    if (result.indexOf("-") !== -1) {
        for(let i = 0; i < result.match(/^[^-]*/).length; i++) {
            const index = result.indexOf("-", i);
            result = `${result.slice(0, index)}${result[index+1].toUpperCase()}${result.slice(index+2)}`;
        }
    }
    return result;
}