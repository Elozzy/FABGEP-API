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
router.get('/user', _purse2["default"].userProfile, _purse["default"].userProfile);
router.get('/purse', _purse2["default"].purse, _purse["default"].purse);
router.post('/transactions', _purse2["default"].transactions, _purse["default"].transactions);
router.post('/transfer', _purse2["default"].transfer, _purse["default"].transfer); // router.post('/deposit', Validator.deposit, Controller.deposit);

var _default = router;
exports["default"] = _default;