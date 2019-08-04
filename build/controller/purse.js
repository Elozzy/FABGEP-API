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

var _encryptor = _interopRequireDefault(require("../helper/encryptor"));

var Purse =
/*#__PURE__*/
function () {
  function Purse() {
    (0, _classCallCheck2["default"])(this, Purse);
  }

  (0, _createClass2["default"])(Purse, null, [{
    key: "purse",
    value: function () {
      var _purse = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(request, response) {
        var uid, account;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                uid = request.query.uid;
                _context.prev = 1;
                _context.next = 4;
                return _Mongodb["default"].findOne('account', {
                  purseOwner: uid
                });

              case 4:
                account = _context.sent;

                if (!account) {
                  response.status(404).json({
                    status: false,
                    data: '',
                    message: 'document not found'
                  });
                } // const secureData = Security.dataEncrypt(JSON.stringify(account));


                response.status(200).json({
                  status: true,
                  data: account,
                  message: 'success'
                });
                _context.next = 12;
                break;

              case 9:
                _context.prev = 9;
                _context.t0 = _context["catch"](1);
                response.status(500).json({
                  status: false,
                  data: _context.t0,
                  message: 'error occurred'
                });

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[1, 9]]);
      }));

      function purse(_x, _x2) {
        return _purse.apply(this, arguments);
      }

      return purse;
    }()
  }, {
    key: "transactions",
    value: function () {
      var _transactions = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2(request, response) {
        var _request$body, uid, limit, recentTransaction;

        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _request$body = request.body, uid = _request$body.uid, limit = _request$body.limit;
                _context2.prev = 1;
                _context2.next = 4;
                return _Mongodb["default"].find('transaction', {
                  uid: uid
                }, limit);

              case 4:
                recentTransaction = _context2.sent;
                console.log(recentTransaction);

                if (!recentTransaction) {
                  response.status(404).json({
                    status: false,
                    data: '',
                    message: 'no document found'
                  });
                }

                response.status(200).json({
                  status: true,
                  data: recentTransaction,
                  message: 'success'
                });
                _context2.next = 12;
                break;

              case 10:
                _context2.prev = 10;
                _context2.t0 = _context2["catch"](1);

              case 12:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[1, 10]]);
      }));

      function transactions(_x3, _x4) {
        return _transactions.apply(this, arguments);
      }

      return transactions;
    }()
  }]);
  return Purse;
}();

exports["default"] = Purse;