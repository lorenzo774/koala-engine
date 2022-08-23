// Routes
module.exports.routes = new Map([
    ["/", "index.html"],
    ["/editor", "editor.html"],
]);
// Content types
module.exports.contentTypes = {
    "": "text/html",
    ".css": "text/css",
    ".js": "text/javascript",
    ".png": "image/png",
    ".svg": "image/svg",
    ".wav": "audio/wav",
};
