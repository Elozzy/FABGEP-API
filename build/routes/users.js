"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _users = _interopRequireDefault(require("../controller/users"));

var _Users = _interopRequireDefault(require("../validation/Users"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express.Router)();
router.post('/signup', _Users["default"].userSignup, _users["default"].userSignup);
var _default = router;
exports["default"] = _default;