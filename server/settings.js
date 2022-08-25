const fs = require('fs');
const path = require("path");
const {serverDir } = require('./utils');

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
    // Image
    ".png": "image/png",
    ".svg": "image/svg",
    // Sound
    ".wav": "audio/wav",
    // Font
    ".woff": "application/x-font-woff"
};

module.exports.options = {
    key: fs.readFileSync(path.join(serverDir, "key.pem")),
    cert: fs.readFileSync(path.join(serverDir, "cert.pem")),
}