"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _notification = _interopRequireDefault(require("../controller/notification"));

var _notification2 = _interopRequireDefault(require("../validation/notification"));

var router = (0, _express.Router)();
router.post('/notification', _notification2["default"].notification, _notification["default"].sendNotification);
router.post('/notifications', _notification2["default"].notifications, _notification["default"].notifications);
router.post('/seenNotifications', _notification["default"].seenNotifications);
var _default = router;
exports["default"] = _default;