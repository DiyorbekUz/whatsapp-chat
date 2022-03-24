const http = require('http');
const fs = require('fs');
const path = require('path');
const PORT = process.env.PORT || 5000
let users = JSON.parse(fs.readFileSync(path.join(__dirname, '../', '/database','users.json'), 'utf-8'))
let messages = JSON.parse(fs.readFileSync(path.join(__dirname, '../', 'database','messages.json'), 'utf-8'))
let writeUsers = JSON.parse(fs.readFileSync(path.join(__dirname, '../', 'database','writeUsers.json'), 'utf-8'))
const url = require('url')
const usersController = require('./controllers/usersController');
const staticFilesController = require('./controllers/staticFilesController');


http.createServer(async function (req, res) {

    if (req.url === "/users" && req.method == 'GET') {
        await usersController.getUsers(req, res, users)
        return
    }

    if (req.url === "/messages" && req.method == 'GET') {
        await usersController.getMessages(req, res, messages)
        return
    }

    if (req.url === "/writeusers" && req.method == 'GET') {
        await usersController.getWriteUsers(req, res, writeUsers)
        return
    }

    if (req.url === "/whatsapp") {
        let buf = fs.readFileSync(path.join(__dirname, "../",'/chat', '/whatsapp.html'))
        res.end(buf)
        return
    }

    if (req.url === "/adduser" && req.method == 'POST') {
        await usersController.addUser(req, res, users)
        fs.writeFileSync(path.join(__dirname, "../",'/database', '/users.json'), JSON.stringify(users))
        res.end(JSON.stringify(users))
    }

    if (req.url === "/sendmessage" && req.method == 'POST') {
        await usersController.sendmessages(req, res, messages)
        fs.writeFileSync(path.join(__dirname, "../",'/database', '/messages.json'), JSON.stringify(messages))
        res.end(JSON.stringify(messages))
    }

    if (req.url === "/addwriteusers" && req.method == 'POST') {
        await usersController.writeUsers(req, res, writeUsers)
        fs.writeFileSync(path.join(__dirname, "../",'/database', '/writeUsers.json'), JSON.stringify(writeUsers))
        res.end(JSON.stringify(writeUsers))
    }

    if (req.url === "/" && req.method == 'GET') {
        fs.readFile(path.join(__dirname, "../", "/public", "/index.html"), function (err, html) {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(html);
        });
        return
    }

    if (req.url.match("\.css$")) {
        var cssPath = path.join(__dirname, '../public', req.url);
        if (cssPath.match("\error.css$")) {
            await staticFilesController.getCss(req, res, '../public/error.css')
        }else{
            await staticFilesController.getCss(req, res, cssPath)
        }
        return
    }
    if (req.url.match("\.png$")) {
        var imagePath = path.join(__dirname, '../public', req.url);
        await staticFilesController.getPng(req, res, imagePath)
        return
    }

    if (req.url.match("\.js$")) {
        let jsPath = path.join(__dirname, '../public/', req.url);
        await staticFilesController.getJs(req, res, jsPath)
        return
    }

    fs.readFile("../public/error.html", function(err, html){
                res.end(html);
            });
}).listen(PORT, () => {
    console.log(`Running ${PORT} http://localhost:${PORT}`)
});