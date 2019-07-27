'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var userRoute = require('./routes/user');
var PORT = process.env.port || 4000;
var app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/v1/', userRoute);

// app.get('/', (req, res) => {
//     res.status(200).send('server online');
// })
// app.post('/auth', Validate.createAccount, UserController.createAccount, (req, res)=>{ })

app.use(function (req, res, next) {
    var error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use(function (err, req, res, next) {
    res.status(err.status || 500).json({
        status: err.status,
        message: 'fatal error',
        data: ""
    });
});

app.listen(PORT, function () {
    console.log('serve running on port ' + PORT);
});
exports.default = app;