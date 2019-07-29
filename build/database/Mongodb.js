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

var _mongodb = require("mongodb");

var CONNECTION_URL = "mongodb+srv://dev:Password1@cluster001-i6loe.mongodb.net/test?retryWrites=true&w=majority";
var db = 'KW-FABGEP';

var MDBConnect =
/*#__PURE__*/
function () {
  function MDBConnect() {
    (0, _classCallCheck2["default"])(this, MDBConnect);
  }

  (0, _createClass2["default"])(MDBConnect, null, [{
    key: "connect",
    value: function () {
      var _connect = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(collection) {
        var client;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _mongodb.MongoClient.connect(CONNECTION_URL);

              case 3:
                client = _context.sent;
                return _context.abrupt("return", client.db(db).collection(collection));

              case 7:
                _context.prev = 7;
                _context.t0 = _context["catch"](0);
                console.log(_context.t0);

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 7]]);
      }));

      function connect(_x) {
        return _connect.apply(this, arguments);
      }

      return connect;
    }()
  }, {
    key: "findOne",
    value: function () {
      var _findOne = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2(collection, keyPair) {
        var c, result;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return MDBConnect.connect(collection);

              case 3:
                c = _context2.sent;
                _context2.next = 6;
                return c.findOne(keyPair);

              case 6:
                result = _context2.sent;
                return _context2.abrupt("return", result);

              case 10:
                _context2.prev = 10;
                _context2.t0 = _context2["catch"](0);
                return _context2.abrupt("return", _context2.t0);

              case 13:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 10]]);
      }));

      function findOne(_x2, _x3) {
        return _findOne.apply(this, arguments);
      }

      return findOne;
    }()
  }, {
    key: "insertOne",
    value: function () {
      var _insertOne = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee3(collection, query) {
        var c, result;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return MDBConnect.connect(collection);

              case 2:
                c = _context3.sent;
                _context3.next = 5;
                return c.insertOne(query);

              case 5:
                result = _context3.sent;
                return _context3.abrupt("return", result);

              case 7:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function insertOne(_x4, _x5) {
        return _insertOne.apply(this, arguments);
      }

      return insertOne;
    }()
  }, {
    key: "insertMany",
    value: function () {
      var _insertMany = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee4(collection, query) {
        var c, result;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return MDBConnect.connect(collection);

              case 2:
                c = _context4.sent;
                _context4.next = 5;
                return c.insertMany(query);

              case 5:
                result = _context4.sent;
                return _context4.abrupt("return", result);

              case 7:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function insertMany(_x6, _x7) {
        return _insertMany.apply(this, arguments);
      }

      return insertMany;
    }()
  }, {
    key: "updateOne",
    value: function () {
      var _updateOne = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee5(collection, keyPair, update) {
        var c, result;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return MDBConnect.connect(collection);

              case 2:
                c = _context5.sent;
                _context5.next = 5;
                return c.updateOne(keyPair, {
                  $set: update
                });

              case 5:
                result = _context5.sent;
                return _context5.abrupt("return", result);

              case 7:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function updateOne(_x8, _x9, _x10) {
        return _updateOne.apply(this, arguments);
      }

      return updateOne;
    }()
  }, {
    key: "findOneAndReplace",
    value: function () {
      var _findOneAndReplace = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee6(collection, keyPair, modification) {
        var c, result;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return MDBConnect.connect(collection);

              case 2:
                c = _context6.sent;
                _context6.next = 5;
                return c.findOneAndReplace(keyPair, modification, {
                  returnNewDocument: true,
                  maxTimeMS: 10
                });

              case 5:
                result = _context6.sent;
                return _context6.abrupt("return", result);

              case 7:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      function findOneAndReplace(_x11, _x12, _x13) {
        return _findOneAndReplace.apply(this, arguments);
      }

      return findOneAndReplace;
    }()
  }]);
  return MDBConnect;
}();

var _default = MDBConnect;
exports["default"] = _default;