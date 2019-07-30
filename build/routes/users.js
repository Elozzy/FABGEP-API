"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _users = _interopRequireDefault(require("../controller/users"));

var _Users = _interopRequireDefault(require("../validation/Users"));

var router = (0, _express.Router)();
router.post('/signup', _Users["default"].userSignup, _users["default"].userSignup);
router.post('/login', _Users["default"].userLogin, _users["default"].userLogin);
router.get('/user', _Users["default"].userProfile, _users["default"].userProfile);
var _default = router;
exports["default"] = _default;