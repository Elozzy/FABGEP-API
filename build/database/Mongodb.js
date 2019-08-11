"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _mongodb = require("mongodb");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var CONNECTION_URL = "mongodb+srv://dev:Password1@cluster001-i6loe.gcp.mongodb.net/test?retryWrites=true&w=majority";
var db = 'FABGEP';

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
                return _context.abrupt("return", {
                  client: client,
                  db: client.db(db).collection(collection)
                });

              case 7:
                _context.prev = 7;
                _context.t0 = _context["catch"](0);
                console.log(_context.t0);
                console.log(_context.t0);

              case 11:
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
        var _c, result;

        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return MDBConnect.connect(collection);

              case 3:
                _c = _context2.sent;
                _context2.next = 6;
                return _c.db.findOne(keyPair);

              case 6:
                result = _context2.sent;

                _c.client.close();

                return _context2.abrupt("return", result);

              case 11:
                _context2.prev = 11;
                _context2.t0 = _context2["catch"](0);
                console.log(_context2.t0);
                return _context2.abrupt("return", _context2.t0);

              case 15:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 11]]);
      }));

      function findOne(_x2, _x3) {
        return _findOne.apply(this, arguments);
      }

      return findOne;
    }()
  }, {
    key: "findMany",
    value: function () {
      var _findMany = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee3(collection, keyPair, limit) {
        var _c2, result;

        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return MDBConnect.connect(collection);

              case 3:
                _c2 = _context3.sent;
                _context3.next = 6;
                return _c2.db.find(keyPair).limit(limit).toArray();

              case 6:
                result = _context3.sent;

                _c2.client.close();

                return _context3.abrupt("return", result);

              case 11:
                _context3.prev = 11;
                _context3.t0 = _context3["catch"](0);
                console.log(_context3.t0);
                return _context3.abrupt("return", _context3.t0);

              case 15:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 11]]);
      }));

      function findMany(_x4, _x5, _x6) {
        return _findMany.apply(this, arguments);
      }

      return findMany;
    }()
  }, {
    key: "insertOne",
    value: function () {
      var _insertOne = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee4(collection, query) {
        var _c3, result;

        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                _context4.next = 3;
                return MDBConnect.connect(collection);

              case 3:
                _c3 = _context4.sent;
                _context4.next = 6;
                return _c3.db.insertOne(_objectSpread({}, query, {}, {
                  lastModified: Date.now()
                }));

              case 6:
                result = _context4.sent;

                _c3.client.close();

                return _context4.abrupt("return", result);

              case 11:
                _context4.prev = 11;
                _context4.t0 = _context4["catch"](0);
                console.log(_context4.t0);
                return _context4.abrupt("return", _context4.t0);

              case 15:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[0, 11]]);
      }));

      function insertOne(_x7, _x8) {
        return _insertOne.apply(this, arguments);
      }

      return insertOne;
    }()
  }, {
    key: "insertMany",
    value: function () {
      var _insertMany = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee5(collection, query) {
        var _c4, result;

        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                try {
                  query = (0, _toConsumableArray2["default"])(query).map(function (e) {
                    return _objectSpread({}, e, {}, {
                      lastModified: Date.now()
                    });
                  });
                } catch (error) {}

                _context5.prev = 1;
                _context5.next = 4;
                return MDBConnect.connect(collection);

              case 4:
                _c4 = _context5.sent;
                _context5.next = 7;
                return _c4.db.insertMany(query);

              case 7:
                result = _context5.sent;

                _c4.client.close();

                return _context5.abrupt("return", result);

              case 12:
                _context5.prev = 12;
                _context5.t0 = _context5["catch"](1);
                console.log(_context5.t0);
                return _context5.abrupt("return", _context5.t0);

              case 16:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[1, 12]]);
      }));

      function insertMany(_x9, _x10) {
        return _insertMany.apply(this, arguments);
      }

      return insertMany;
    }()
  }, {
    key: "updateOne",
    value: function () {
      var _updateOne = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee6(collection, keyPair, update) {
        var _c5, result;

        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.prev = 0;
                _context6.next = 3;
                return MDBConnect.connect(collection);

              case 3:
                _c5 = _context6.sent;
                _context6.next = 6;
                return _c5.db.updateOne(keyPair, _objectSpread({}, update, {
                  $currentDate: {
                    lastModified: true
                  }
                }));

              case 6:
                result = _context6.sent;

                _c5.client.close();

                return _context6.abrupt("return", result);

              case 11:
                _context6.prev = 11;
                _context6.t0 = _context6["catch"](0);
                console.log(_context6.t0);
                return _context6.abrupt("return", _context6.t0);

              case 15:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, null, [[0, 11]]);
      }));

      function updateOne(_x11, _x12, _x13) {
        return _updateOne.apply(this, arguments);
      }

      return updateOne;
    }()
  }, {
    key: "updateMany",
    value: function () {
      var _updateMany = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee7(collection, keyPair, update) {
        var _c6, result;

        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                try {
                  update = (0, _toConsumableArray2["default"])(update).map(function (e) {
                    return _objectSpread({}, e, {}, {
                      lastModified: Date.now()
                    });
                  });
                } catch (error) {}

                _context7.prev = 1;
                _context7.next = 4;
                return MDBConnect.connect(collection);

              case 4:
                _c6 = _context7.sent;
                _context7.next = 7;
                return _c6.db.updateMany(keyPair, update);

              case 7:
                result = _context7.sent;

                _c6.client.close();

                return _context7.abrupt("return", result);

              case 12:
                _context7.prev = 12;
                _context7.t0 = _context7["catch"](1);
                console.log(_context7.t0);
                return _context7.abrupt("return", _context7.t0);

              case 16:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, null, [[1, 12]]);
      }));

      function updateMany(_x14, _x15, _x16) {
        return _updateMany.apply(this, arguments);
      }

      return updateMany;
    }()
  }, {
    key: "deleteOne",
    value: function () {
      var _deleteOne = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee8(collection, keyPair) {
        var _c7, result;

        return _regenerator["default"].wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.prev = 0;
                _context8.next = 3;
                return MDBConnect.connect(collection);

              case 3:
                _c7 = _context8.sent;
                _context8.next = 6;
                return _c7.db.deleteOne(keyPair);

              case 6:
                result = _context8.sent;

                _c7.client.close();

                return _context8.abrupt("return", result);

              case 11:
                _context8.prev = 11;
                _context8.t0 = _context8["catch"](0);

              case 13:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, null, [[0, 11]]);
      }));

      function deleteOne(_x17, _x18) {
        return _deleteOne.apply(this, arguments);
      }

      return deleteOne;
    }()
  }, {
    key: "deleteMany",
    value: function () {
      var _deleteMany = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee9(collection, keyPair) {
        var col, result;
        return _regenerator["default"].wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.prev = 0;
                _context9.next = 3;
                return MDBConnect.connect(collection);

              case 3:
                col = _context9.sent;
                _context9.next = 6;
                return col.deleteMany(keyPair);

              case 6:
                result = _context9.sent;
                c.client.close();
                return _context9.abrupt("return", result);

              case 11:
                _context9.prev = 11;
                _context9.t0 = _context9["catch"](0);
                console.log(_context9.t0);
                return _context9.abrupt("return", _context9.t0);

              case 15:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, null, [[0, 11]]);
      }));

      function deleteMany(_x19, _x20) {
        return _deleteMany.apply(this, arguments);
      }

      return deleteMany;
    }()
  }]);
  return MDBConnect;
}();

var _default = MDBConnect;
exports["default"] = _default;