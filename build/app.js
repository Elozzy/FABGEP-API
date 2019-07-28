"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _httpErrors = _interopRequireDefault(require("http-errors"));

var _express = _interopRequireWildcard(require("express"));

var _path = require("path");

var _morgan = _interopRequireDefault(require("morgan"));

var _users = _interopRequireDefault(require("./routes/users"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
app.use((0, _morgan["default"])('dev'));
app.use((0, _express.json)());
app.use((0, _express.urlencoded)({
  extended: false
}));
app.use('/api/v1/', _users["default"]);
app.get('/', function (request, response) {
  return response.status(200).json({
    status: 200,
    error: 'Welcome to Farmmoni API'
  });
}); // catch 404 and forward to error handler

app.use(function (request, response, next) {
  next((0, _httpErrors["default"])(404));
}); // error handler

app.use(function (error, request, response, next) {
  response.status(error.status || 500).json({
    status: error || 500,
    error: request.app.get('env') === 'development' ? error : {}
  });
});
var port = process.env.PORT || 5000;
app.listen(port, function () {
  "Listening to ".concat(port);
});
var _default = app;
exports["default"] = _default;