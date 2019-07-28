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

var CONNECTION_URL = "mongodb+srv://foodmoni:B9aCRPAHQf5T1sjZ@cluster0-ax5bs.mongodb.net/test?retryWrites=true&w=majority";
var db = 'foodmoni';

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
                return _context.abrupt("return", client.db('foodmoni').collection(collection));

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
      _regenerator["default"].mark(function _callee2(collection, query) {
        var c, result;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return MDBConnect.connect('foodmoni', collection);

              case 2:
                c = _context2.sent;
                _context2.next = 5;
                return c.findOne(query);

              case 5:
                result = _context2.sent;
                return _context2.abrupt("return", result);

              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function findOne(_x2, _x3) {
        return _findOne.apply(this, arguments);
      }

      return findOne;
    }()
  }, {
    key: "insert",
    value: function () {
      var _insert = (0, _asyncToGenerator2["default"])(
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

      function insert(_x4, _x5) {
        return _insert.apply(this, arguments);
      }

      return insert;
    }()
  }]);
  return MDBConnect;
}();

var _default = MDBConnect;
exports["default"] = _default;