"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _users = _interopRequireDefault(require("../controller/users"));

var _Users = _interopRequireDefault(require("../validation/Users"));

var _authentication = _interopRequireDefault(require("../helper/authentication"));

var router = (0, _express.Router)();
router.post('/auth', _authentication["default"].tokenAuthentication);
router.post('/signup', _Users["default"].userSignup, _users["default"].userSignup);
router.post('/login', _Users["default"].userLogin, _users["default"].userLogin);
router.post('/validatePin', _authentication["default"].isAuthenticated, _users["default"].validatePin);
var _default = router;
exports["default"] = _default;