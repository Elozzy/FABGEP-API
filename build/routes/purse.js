"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _purse = _interopRequireDefault(require("../controller/purse"));

var _purse2 = _interopRequireDefault(require("../validation/purse"));

var router = (0, _express.Router)();
router.get('/purse', _purse2["default"].getPurseAccount, _purse["default"].getPurse);
var _default = router;
exports["default"] = _default;