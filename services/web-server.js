const http = require('http');
const express = require('express');
const webServerConfig = require('../config/web-server')

let httpServer;

function initialize() {
    return new Promise((resolve, reject) => {
        const app = express();
        httpServer = http.createServer(app);

        app.get('/', (req, res) => {
            res.end('Hello World!');
        });

        httpServer.listen(webServerConfig.port)
            .on('listening', () => {
                console.log(`Web Server Listening on localhost:${webServerConfig.port}`);
                resolve();
            })
            .on('error', err => {
                reject(err);
            });
    });
}

module.exports.initialize = initialize;