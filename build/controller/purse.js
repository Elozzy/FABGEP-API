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

var _notifiaction = _interopRequireDefault(require("../controller/notifiaction"));

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
                console.log(uid);
                _context.prev = 2;
                _context.next = 5;
                return _Mongodb["default"].findOne('account', {
                  purseOwner: uid
                });

              case 5:
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
                _context.next = 14;
                break;

              case 10:
                _context.prev = 10;
                _context.t0 = _context["catch"](2);
                console.log(_context.t0);
                response.status(500).json({
                  status: false,
                  data: _context.t0,
                  message: 'error occurred'
                });

              case 14:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[2, 10]]);
      }));

      function purse(_x, _x2) {
        return _purse.apply(this, arguments);
      }

      return purse;
    }() // static async updatePurse(request, response) {
    //     const input = request.body;
    //     const output = await MDBConnect.updateOne("account",{uid:input.uid},{pur})
    // }

  }, {
    key: "transaction",
    value: function () {
      var _transaction = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2(request, response) {
        var transaction, newTransaction, sent;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                transaction = request.body;
                _context2.prev = 1;
                _context2.next = 4;
                return _Mongodb["default"].insertOne('transaction', {
                  uid: transaction.uid
                });

              case 4:
                newTransaction = _context2.sent;
                console.log(newTransaction);

                if (!newTransaction) {
                  response.status(404).json({
                    status: false,
                    data: '',
                    message: 'no document found'
                  });
                }

                _context2.next = 9;
                return _notifiaction["default"].notify({
                  "uid": transaction.uid,
                  "title": transaction.title,
                  "desc": transaction.desc,
                  "type": transaction.status ? 'danger' : 'info',
                  "seen": false,
                  "timestamp": Date.now()
                });

              case 9:
                sent = _context2.sent;
                response.status(200).json({
                  status: true,
                  data: recentTransaction,
                  message: 'success'
                });
                _context2.next = 16;
                break;

              case 13:
                _context2.prev = 13;
                _context2.t0 = _context2["catch"](1);
                response.status(500).json({
                  status: false,
                  data: _context2.t0,
                  message: 'error occurred'
                });

              case 16:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[1, 13]]);
      }));

      function transaction(_x3, _x4) {
        return _transaction.apply(this, arguments);
      }

      return transaction;
    }()
  }, {
    key: "transactions",
    value: function () {
      var _transactions = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee3(request, response) {
        var _request$body, uid, limit, _recentTransaction;

        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _request$body = request.body, uid = _request$body.uid, limit = _request$body.limit;
                _context3.prev = 1;
                _context3.next = 4;
                return _Mongodb["default"].find('transaction', {
                  uid: uid
                }, limit);

              case 4:
                _recentTransaction = _context3.sent;
                console.log(_recentTransaction);

                if (!_recentTransaction) {
                  response.status(404).json({
                    status: false,
                    data: '',
                    message: 'no document found'
                  });
                }

                response.status(200).json({
                  status: true,
                  data: _recentTransaction,
                  message: 'success'
                });
                _context3.next = 13;
                break;

              case 10:
                _context3.prev = 10;
                _context3.t0 = _context3["catch"](1);
                response.status(500).json({
                  status: false,
                  data: _context3.t0,
                  message: 'error occurred'
                });

              case 13:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[1, 10]]);
      }));

      function transactions(_x5, _x6) {
        return _transactions.apply(this, arguments);
      }

      return transactions;
    }()
  }]);
  return Purse;
}();

exports["default"] = Purse;