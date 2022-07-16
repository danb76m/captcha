/*
https://www.digitalocean.com/community/tutorials/how-to-create-a-web-server-in-node-js-with-the-http-module
https://github.com/trekjs/captcha
*/

const http = require("http");
const fs = require('fs');
const captcha = require('trek-captcha');

var config = require("./config.json");

const requestListener = async function (req, res) {
    var key = req.headers['key'];
    if (key == null || key != config.key) {
        res.writeHead(404);
        res.end("Invalid key");
        return;
    }

    const { token, buffer } = await captcha()
    res.writeHead(200, {'Content-Type': 'image/png', 'solution': token});
    res.end(buffer);
};

const server = http.createServer(requestListener);
server.listen(config.port, config.host);