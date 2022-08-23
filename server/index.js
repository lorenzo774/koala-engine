const http = require("http");
const fs = require("fs").promises;
const path = require("path");
const { contentTypes, routes } = require("./settings");

const PORT = 3000;
const dir = path.join(path.dirname(path.basename(__filename)), "public");

// Serve static html
const requestListener = function (req, res) {
    // There are only 2 available routes
    const ext = path.extname(req.url);
    if (!routes.get(req.url) && ext === "") return;
    const pathToResource = ext === "" ? `/${routes.get(req.url)}` : req.url;
    // CURRENT REQUEST
    fs.readFile(`${dir}${pathToResource}`)
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

http.createServer(requestListener).listen(PORT, "localhost", () => {
    console.log(`
Server is running on port ${PORT}

    GAME:\t http://localhost:${PORT}
    EDITOR:\t http://localhost:${PORT}/editor`);
});
