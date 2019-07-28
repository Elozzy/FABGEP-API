"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _httpErrors = _interopRequireDefault(require("http-errors"));

var _express = _interopRequireWildcard(require("express"));

var _path = require("path");

var _morgan = _interopRequireDefault(require("morgan"));

var _users = _interopRequireDefault(require("./routes/users"));

require("babel-core/register");

require("babel-polyfill");

var app = (0, _express["default"])();
app.use((0, _morgan["default"])('dev'));
app.use((0, _express.json)());
app.use((0, _express.urlencoded)({
  extended: false
}));
app.use('/api/v1/', _users["default"]);
app.get('/', function (request, response) {
  return response.status(200).json({
    status: true,
    data: '',
    message: 'Welcome to Foodmoni API'
  });
}); // catch 404 and forward to error handler

app.use(function (request, response, next) {
  next((0, _httpErrors["default"])(404));
}); // error handler

app.use(function (error, request, response, next) {
  console.log(error);
  response.status(error.status || 500).json({
    status: false,
    data: error,
    message: 'Service not available'
  });
});
var port = process.env.PORT || 5000;
app.listen(port, function () {
  console.log("Server Running:  ".concat(port));
});
var _default = app;
exports["default"] = _default;