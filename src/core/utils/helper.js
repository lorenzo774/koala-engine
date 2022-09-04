"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toPascalCase = exports.sleep = exports.loadImage = void 0;
function loadImage(path) {
    const img = new Image();
    img.src = path;
    return img;
}
exports.loadImage = loadImage;
async function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
exports.sleep = sleep;
function toPascalCase(value) {
    let result = value;
    result = `${result[0].toUpperCase()}${result.slice(1)}`;
    if (result.indexOf("-") !== -1) {
        for (let i = 0; i < result.match(/^[^-]*/).length; i++) {
            const index = result.indexOf("-", i);
            result = `${result.slice(0, index)}${result[index + 1].toUpperCase()}${result.slice(index + 2)}`;
        }
    }
    return result;
}
exports.toPascalCase = toPascalCase;
