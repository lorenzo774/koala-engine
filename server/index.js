const https = require("https");
const fs = require("fs").promises;
const path = require("path");
const { contentTypes, routes, options } = require("./settings");
const { publicDir } = require("./utils");

const PORT = 3000;

// Serve static html
const requestListener = function (req, res) {
    // There are only 2 available routes
    const ext = path.extname(req.url);
    if (!routes.get(req.url) && ext === "") return;
    const pathToResource = ext === "" ? `/${routes.get(req.url)}` : req.url;
    // CURRENT REQUEST
    fs.readFile(`${publicDir}${pathToResource}`)
        .then((resource) => {
            res.setHeader("Content-Type", contentTypes[ext]);
            res.writeHead(200);
            res.end(resource);
        })
        .catch((error) => {
            res.writeHead(500);
            res.end(error);
        });
};

https.createServer(options, requestListener).listen(PORT, "localhost", () => {
    console.log(`
Server is running on port ${PORT}

    GAME:\t https://localhost:${PORT}
    EDITOR:\t https://localhost:${PORT}/editor`);
});