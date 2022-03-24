const fs = require('fs');
const path = require('path');
module.exports = {
    getCss: async (req, res, cssPath) => {
        var fileStream = fs.createReadStream(cssPath, "UTF-8");
        res.writeHead(200, {"Content-Type": "text/css"});
        fileStream.pipe(res)
    },
    getPng: async (req, res, imagePath) => {
        var fileStream = fs.createReadStream(imagePath);
        res.writeHead(200, {"Content-Type": "image/png"});
        fileStream.pipe(res);
    },
    getJs: async (req, res, jsPath) => {
        if (fs.existsSync(jsPath)) {
        } else {
            jsPath = path.join(__dirname, '../../chat/', req.url);
        }
        const fileStream = fs.createReadStream(jsPath, "UTF-8");
        res.writeHead(200, { "Content-Type": "text/javascript" });
        fileStream.pipe(res);
    }
}