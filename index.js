var express = require('express');
var app = express();
var httpProxy = require('http-proxy');
var apiProxy = httpProxy.createProxyServer();
var bully = 'http://127.0.0.1:8888',
    ServerTwo = 'http://localhost:3002';

app.get('/',function(req,res) {
    res.send("Hello world From Server 1");
});

app.all("/bully/*", function(req, res) {
    console.log('redirecting to Server1');
    apiProxy.web(req, res, {
        target: bully
    });
});

app.all("/app2/*", function(req, res) {
    console.log('redirecting to Server2');
    apiProxy.web(req, res, {
        target: ServerTwo
    });
});

app.listen(3000);
