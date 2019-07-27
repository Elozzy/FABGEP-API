'use strict';

var express = require('express');

var PORT = process.env.port || 4000;
var app = express();

app.get('/', function (req, res) {
    res.status(200).send('server online');
});

app.listen(PORT, function () {
    console.log('serve running on port ' + PORT);
});