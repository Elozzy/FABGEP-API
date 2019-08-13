"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _Mongodb = _interopRequireDefault(require("../database/Mongodb"));

var Notification =
/*#__PURE__*/
function () {
  function Notification() {
    (0, _classCallCheck2["default"])(this, Notification);
  }

  (0, _createClass2["default"])(Notification, null, [{
    key: "notify",
    value: function () {
      var _notify = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(payload) {
        var sent;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _Mongodb["default"].insertOne('notification', payload);

              case 2:
                sent = _context.sent;

                if (sent) {
                  _context.next = 5;
                  break;
                }

                return _context.abrupt("return", false);

              case 5:
                return _context.abrupt("return", true);

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function notify(_x) {
        return _notify.apply(this, arguments);
      }

      return notify;
    }()
  }, {
    key: "sendNotification",
    value: function () {
      var _sendNotification = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2(request, response) {
        var _payload, sent;

        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _payload = request.body;
                _context2.next = 4;
                return Notification.notify(_payload);

              case 4:
                sent = _context2.sent;

                if (!sent) {
                  response.status(500).json({
                    status: false,
                    data: sent,
                    message: 'error fetching notifications'
                  });
                }

                response.status(200).json({
                  status: true,
                  data: _payload,
                  message: 'success'
                });
                _context2.next = 12;
                break;

              case 9:
                _context2.prev = 9;
                _context2.t0 = _context2["catch"](0);
                response.status(500).json({
                  status: false,
                  data: _context2.t0,
                  message: 'error fetching notifications'
                });

              case 12:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 9]]);
      }));

      function sendNotification(_x2, _x3) {
        return _sendNotification.apply(this, arguments);
      }

      return sendNotification;
    }()
  }, {
    key: "notifications",
    value: function () {
      var _notifications = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee3(request, response) {
        var _request$body, query, limit, data;

        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _request$body = request.body, query = _request$body.query, limit = _request$body.limit;
                _context3.next = 4;
                return _Mongodb["default"].findMany('notification', query, limit);

              case 4:
                data = _context3.sent;

                if (!data) {
                  response.status(500).json({
                    status: false,
                    data: data,
                    message: 'error fetching notifications'
                  });
                }

                response.status(200).json({
                  status: true,
                  data: data,
                  message: 'success'
                });
                _context3.next = 13;
                break;

              case 9:
                _context3.prev = 9;
                _context3.t0 = _context3["catch"](0);
                console.log(_context3.t0);
                response.status(500).json({
                  status: false,
                  data: _context3.t0,
                  message: 'error fetching notifications'
                });

              case 13:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 9]]);
      }));

      function notifications(_x4, _x5) {
        return _notifications.apply(this, arguments);
      }

      return notifications;
    }()
  }, {
    key: "deleteNotification",
    value: function () {
      var _deleteNotification = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee4() {
        var id, list;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                id = request.body.id;
                _context4.next = 4;
                return _Mongodb["default"].deleteMany('notification', {
                  id: id
                });

              case 4:
                list = _context4.sent;

                if (!list) {
                  response.status(500).json({
                    status: false,
                    data: list,
                    message: 'error fetching notifications'
                  });
                }

                response.status(200).json({
                  status: true,
                  data: payload,
                  message: 'success'
                });
                _context4.next = 12;
                break;

              case 9:
                _context4.prev = 9;
                _context4.t0 = _context4["catch"](0);
                response.status(500).json({
                  status: false,
                  data: _context4.t0,
                  message: 'error fetching notifications'
                });

              case 12:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[0, 9]]);
      }));

      function deleteNotification() {
        return _deleteNotification.apply(this, arguments);
      }

      return deleteNotification;
    }()
  }, {
    key: "seenNotifications",
    value: function () {
      var _seenNotifications = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee5(request, response) {
        var uid, data;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                uid = request.userData.uid;
                _context5.next = 4;
                return _Mongodb["default"].updateMany('notification', {
                  uid: uid,
                  seen: false
                }, {
                  $set: {
                    seen: true
                  }
                });

              case 4:
                data = _context5.sent;

                if (!data) {
                  response.status(500).json({
                    status: false,
                    data: data,
                    message: 'error updating notifications'
                  });
                }

                response.status(200).json({
                  status: true,
                  data: {},
                  message: 'success'
                });
                _context5.next = 13;
                break;

              case 9:
                _context5.prev = 9;
                _context5.t0 = _context5["catch"](0);
                console.log(_context5.t0);
                response.status(500).json({
                  status: false,
                  data: _context5.t0,
                  message: 'error updating notifications'
                });

              case 13:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[0, 9]]);
      }));

      function seenNotifications(_x6, _x7) {
        return _seenNotifications.apply(this, arguments);
      }

      return seenNotifications;
    }()
  }]);
  return Notification;
}();

exports["default"] = Notification;