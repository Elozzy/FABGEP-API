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
router.get('/purse', _purse2["default"].purse, _purse["default"].purse);
router.post('/transactions', _purse2["default"].transactions, _purse["default"].transactions);
var _default = router;
exports["default"] = _default;