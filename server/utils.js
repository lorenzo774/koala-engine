const path = require("path");

module.exports.publicDir = path.join(path.dirname(path.basename(__filename)), "public");
module.exports.serverDir = path.join(path.dirname(path.basename(__filename)), "server");