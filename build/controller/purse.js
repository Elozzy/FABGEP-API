"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _Mongodb = _interopRequireDefault(require("../database/Mongodb"));

var _encryptor = _interopRequireDefault(require("../helper/encryptor"));

var _notifiaction = _interopRequireDefault(require("../controller/notifiaction"));

var _v = _interopRequireDefault(require("uuid/v4"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var Purse =
/*#__PURE__*/
function () {
  function Purse() {
    (0, _classCallCheck2["default"])(this, Purse);
  }

  (0, _createClass2["default"])(Purse, null, [{
    key: "generateNumber",
    value: function generateNumber() {
      var random = Date.now().toString();
      var sub = random.substr(6, random.length);
      var salt = Math.floor(100 + Math.random() * 900);
      var num = Number("".concat(salt).concat(sub));
      return num;
    }
  }, {
    key: "userProfile",
    value: function () {
      var _userProfile = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(request, response) {
        var uid, data;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                uid = request.query.uid;
                _context.next = 4;
                return _Mongodb["default"].findOne('users', {
                  uid: uid
                });

              case 4:
                data = _context.sent;

                if (data) {
                  _context.next = 7;
                  break;
                }

                return _context.abrupt("return", response.status(404).json({
                  status: false,
                  message: 'no document found',
                  'data': data
                }));

              case 7:
                return _context.abrupt("return", response.status(200).json({
                  'status': true,
                  data: data,
                  'message': "document found"
                }));

              case 10:
                _context.prev = 10;
                _context.t0 = _context["catch"](0);
                return _context.abrupt("return", response.status(500).json({
                  status: false,
                  message: 'error occurred',
                  'data': _context.t0
                }));

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 10]]);
      }));

      function userProfile(_x, _x2) {
        return _userProfile.apply(this, arguments);
      }

      return userProfile;
    }()
  }, {
    key: "purse",
    value: function () {
      var _purse = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2(request, response) {
        var uid, account;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                uid = request.query.uid;
                console.log(uid);
                _context2.prev = 2;
                _context2.next = 5;
                return _Mongodb["default"].findOne('account', {
                  purseOwner: uid
                });

              case 5:
                account = _context2.sent;

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
                _context2.next = 14;
                break;

              case 10:
                _context2.prev = 10;
                _context2.t0 = _context2["catch"](2);
                console.log(_context2.t0);
                response.status(500).json({
                  status: false,
                  data: _context2.t0,
                  message: 'error occurred'
                });

              case 14:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[2, 10]]);
      }));

      function purse(_x3, _x4) {
        return _purse.apply(this, arguments);
      }

      return purse;
    }()
  }, {
    key: "transaction",
    value: function () {
      var _transaction = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee3(request, response) {
        var transaction, newTransaction, sent;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                transaction = request.body;
                _context3.prev = 1;
                _context3.next = 4;
                return _Mongodb["default"].insertOne('transaction', {
                  uid: transaction.uid
                });

              case 4:
                newTransaction = _context3.sent;
                console.log(newTransaction);

                if (!newTransaction) {
                  response.status(404).json({
                    status: false,
                    data: '',
                    message: 'no document found'
                  });
                }

                _context3.next = 9;
                return _notifiaction["default"].notify({
                  "uid": transaction.uid,
                  "title": transaction.title,
                  "desc": transaction.desc,
                  "type": transaction.status ? 'danger' : 'info',
                  "seen": false,
                  "timestamp": Date.now()
                });

              case 9:
                sent = _context3.sent;
                response.status(200).json({
                  status: true,
                  data: recentTransaction,
                  message: 'success'
                });
                _context3.next = 16;
                break;

              case 13:
                _context3.prev = 13;
                _context3.t0 = _context3["catch"](1);
                response.status(500).json({
                  status: false,
                  data: _context3.t0,
                  message: 'error occurred'
                });

              case 16:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[1, 13]]);
      }));

      function transaction(_x5, _x6) {
        return _transaction.apply(this, arguments);
      }

      return transaction;
    }()
  }, {
    key: "transactions",
    value: function () {
      var _transactions = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee4(request, response) {
        var _request$body, uid, limit, _recentTransaction;

        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _request$body = request.body, uid = _request$body.uid, limit = _request$body.limit;
                _context4.prev = 1;
                _context4.next = 4;
                return _Mongodb["default"].find('transaction', {
                  uid: uid
                }, limit);

              case 4:
                _recentTransaction = _context4.sent;
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
                _context4.next = 13;
                break;

              case 10:
                _context4.prev = 10;
                _context4.t0 = _context4["catch"](1);
                response.status(500).json({
                  status: false,
                  data: _context4.t0,
                  message: 'error occurred'
                });

              case 13:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[1, 10]]);
      }));

      function transactions(_x7, _x8) {
        return _transactions.apply(this, arguments);
      }

      return transactions;
    }()
  }, {
    key: "onTransferFailed",
    value: function () {
      var _onTransferFailed = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee5(transactionRefId, senderData, amount, toAccount) {
        var payload, e;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                payload = {
                  uid: senderData.uid,
                  title: "Transaction Failed",
                  desc: "Your transfer of ".concat(amount, " to purse ").concat(toAccount, " has failed contact support for more information ref: ").concat(transactionRefId, " ").concat(new Date().toLocaleDateString()),
                  type: 'danger',
                  seen: false,
                  timestamp: Date.now()
                };
                _context5.next = 3;
                return _Mongodb["default"].insertOne('collection', payload);

              case 3:
                e = _context5.sent;
                return _context5.abrupt("return", e);

              case 5:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function onTransferFailed(_x9, _x10, _x11, _x12) {
        return _onTransferFailed.apply(this, arguments);
      }

      return onTransferFailed;
    }()
  }, {
    key: "onDepositFailed",
    value: function () {
      var _onDepositFailed = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee6(transaction) {
        var payload, e;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                payload = {
                  uid: senderData.uid,
                  title: "Transaction Failed",
                  desc: "Your transfer of ".concat(amount, " to purse ").concat(toAccount, " has failed contact support for more information ref: ").concat(transactionRefId, " ").concat(new Date().toLocaleDateString()),
                  type: 'danger',
                  seen: false,
                  timestamp: Date.now()
                };
                _context6.next = 3;
                return _Mongodb["default"].insertOne('collection', payload);

              case 3:
                e = _context6.sent;
                return _context6.abrupt("return", e);

              case 5:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      function onDepositFailed(_x13) {
        return _onDepositFailed.apply(this, arguments);
      }

      return onDepositFailed;
    }()
  }, {
    key: "transfer",
    value: function () {
      var _transfer = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee7(request, response) {
        var _request$body2, amount, toAccount, purpose, pin, senderData, senderPurse, receiverData, receiverPurse, transactionRefId, senderTransaction, receiverTransaction, createTransaction, failed, log, _failed, updateSenderPurseAccount, _failed2, updateReceiverPurseAccount, _failed3, updateTransaction, _failed4, senderNotification, receiverNotification, sendNotification;

        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _request$body2 = request.body, amount = _request$body2.amount, toAccount = _request$body2.toAccount, purpose = _request$body2.purpose, pin = _request$body2.pin;
                console.log(request.body); // Fetch sender data

                senderData = request.userData;
                console.log(senderData); // validate sender pin

                if (!(pin != senderData.pin)) {
                  _context7.next = 8;
                  break;
                }

                if (senderPurse) {
                  _context7.next = 8;
                  break;
                }

                console.log('invalid pin number');
                return _context7.abrupt("return", response.status(400).json({
                  data: '',
                  status: false,
                  message: 'invalid pin number'
                }));

              case 8:
                _context7.next = 10;
                return _Mongodb["default"].findOne('account', {
                  purseOwner: senderData.uid,
                  number: senderData.purseNumber
                });

              case 10:
                senderPurse = _context7.sent;

                if (senderPurse) {
                  _context7.next = 14;
                  break;
                }

                console.log('invalid account number');
                return _context7.abrupt("return", response.status(404).json({
                  data: '',
                  status: false,
                  message: 'invalid account number'
                }));

              case 14:
                console.log(senderPurse); // Fetch receiver data

                _context7.next = 17;
                return _Mongodb["default"].findOne('users', {
                  purseNumber: toAccount
                });

              case 17:
                receiverData = _context7.sent;

                if (receiverData) {
                  _context7.next = 21;
                  break;
                }

                console.log('invalid receiver account number');
                return _context7.abrupt("return", response.status(404).json({
                  data: '',
                  status: false,
                  message: 'invalid receiver account number'
                }));

              case 21:
                console.log(receiverData); // Fetch receiver purse account

                _context7.next = 24;
                return _Mongodb["default"].findOne('account', {
                  purseOwner: receiverData.uid,
                  number: toAccount
                });

              case 24:
                receiverPurse = _context7.sent;

                if (receiverPurse) {
                  _context7.next = 28;
                  break;
                }

                console.log('invalid account number');
                return _context7.abrupt("return", response.status(404).json({
                  data: '',
                  status: false,
                  message: 'invalid account number'
                }));

              case 28:
                console.log(receiverPurse); // validate sender has sufficient funds to make transfer

                if (!(amount > senderPurse.balance)) {
                  _context7.next = 32;
                  break;
                }

                console.log('insufficient funds');
                return _context7.abrupt("return", response.status(402).json({
                  data: '',
                  status: false,
                  message: 'insufficient funds'
                }));

              case 32:
                // Create Transaction receipt
                transactionRefId = "FMT-".concat(senderData.purseNumber.toString().substr(6, 10), "-").concat(toAccount.toString().substr(6, 10), "-").concat(Purse.generateNumber()); // create transaction

                senderTransaction = {
                  ref: transactionRefId,
                  type: 'TRANSFER',
                  from: senderData.purseNumber,
                  to: toAccount,
                  fromAccountName: "".concat(senderData.firstName, " ").concat(senderData.lastName),
                  toAccountName: "".concat(receiverData.firstName, " ").concat(receiverData.lastName),
                  uid: senderData.uid,
                  amount: amount,
                  currency: 'USD',
                  status: 'P',
                  method: 'Transfer',
                  title: 'Transfer',
                  desc: "Transferred $".concat(amount, " from your account to ").concat(receiverData.firstName, " ").concat(receiverData.lastName, " (").concat(toAccount, "). ").concat(purpose),
                  timestamp: Date.now(),
                  metadata: {
                    ip: Purse.getIp(),
                    useragent: request.useragent
                  }
                };
                receiverTransaction = {
                  ref: transactionRefId,
                  type: 'TRANSFER',
                  from: senderData.purseNumber,
                  to: toAccount,
                  fromAccountName: "".concat(senderData.firstName, " ").concat(senderData.lastName),
                  toAccountName: "".concat(receiverData.firstName, " ").concat(receiverData.lastName),
                  uid: receiverData.uid,
                  amount: amount,
                  currency: 'USD',
                  status: 'P',
                  method: 'Transfer',
                  title: 'Transfer',
                  desc: "Transferred $".concat(amount, " from your account to ").concat(receiverData.firstName, " ").concat(receiverData.lastName, " (").concat(toAccount, "). ").concat(purpose),
                  timestamp: Date.now(),
                  metadata: {
                    ip: Purse.getIp(),
                    useragent: request.useragent
                  }
                };
                _context7.next = 37;
                return _Mongodb["default"].insertMany('transaction', [senderTransaction, receiverTransaction]);

              case 37:
                createTransaction = _context7.sent;

                if (createTransaction) {
                  _context7.next = 44;
                  break;
                }

                _context7.next = 41;
                return Purse.onTransferFailed(transactionRefId, senderData, amount, toAccount);

              case 41:
                failed = _context7.sent;
                console.log('unable to initiate transaction');
                return _context7.abrupt("return", response.status(500).json({
                  data: '',
                  status: false,
                  message: 'unable to initiate transaction'
                }));

              case 44:
                _context7.next = 46;
                return _Mongodb["default"].insertMany('purseSnapshot', [{
                  ref: transactionRefId,
                  senderPurse: senderPurse,
                  receiverPurse: receiverPurse
                }]);

              case 46:
                log = _context7.sent;

                if (log) {
                  _context7.next = 53;
                  break;
                }

                _context7.next = 50;
                return Purse.onTransferFailed(transactionRefId, senderData, amount, toAccount);

              case 50:
                _failed = _context7.sent;
                console.log('unable to initiate transaction');
                return _context7.abrupt("return", response.status(500).json({
                  data: '',
                  status: false,
                  message: 'unable to initiate transaction'
                }));

              case 53:
                _context7.next = 55;
                return _Mongodb["default"].updateOne('account', {
                  number: senderData.purseNumber,
                  purseOwner: senderData.uid
                }, {
                  '$inc': {
                    balance: -amount
                  }
                });

              case 55:
                updateSenderPurseAccount = _context7.sent;

                if (updateSenderPurseAccount) {
                  _context7.next = 62;
                  break;
                }

                _context7.next = 59;
                return Purse.onTransferFailed(transactionRefId, senderData, amount, toAccount);

              case 59:
                _failed2 = _context7.sent;
                console.log('unable to process transaction');
                return _context7.abrupt("return", response.status(500).json({
                  data: '',
                  status: false,
                  message: 'unable to process transaction'
                }));

              case 62:
                _context7.next = 64;
                return _Mongodb["default"].updateOne('account', {
                  number: toAccount,
                  purseOwner: receiverData.uid
                }, {
                  '$inc': {
                    balance: amount
                  }
                });

              case 64:
                updateReceiverPurseAccount = _context7.sent;

                if (updateReceiverPurseAccount) {
                  _context7.next = 71;
                  break;
                }

                _context7.next = 68;
                return Purse.onTransferFailed(transactionRefId, senderData, amount, toAccount);

              case 68:
                _failed3 = _context7.sent;
                console.log('unable to process transaction');
                return _context7.abrupt("return", response.status(500).json({
                  data: '',
                  status: false,
                  message: 'unable to process transaction'
                }));

              case 71:
                _context7.next = 73;
                return _Mongodb["default"].updateMany('transaction', {
                  ref: transactionRefId
                }, {
                  '$set': {
                    status: 'S'
                  }
                });

              case 73:
                updateTransaction = _context7.sent;

                if (updateTransaction) {
                  _context7.next = 80;
                  break;
                }

                _context7.next = 77;
                return Purse.onTransferFailed(transactionRefId, senderData, amount, toAccount);

              case 77:
                _failed4 = _context7.sent;
                console.log('unable to update transaction');
                return _context7.abrupt("return", response.status(500).json({
                  data: '',
                  status: false,
                  message: 'unable to update transaction'
                }));

              case 80:
                // create Sender Notification
                senderNotification = [{
                  uid: senderData.uid,
                  title: "Debit Alert",
                  desc: "Your purse xxxxxx".concat(senderData.purseNumber.toString().substr(6, 10), " has been debited ").concat(amount, " ref: ").concat(transactionRefId, " Date: ").concat(new Date().toLocaleDateString()),
                  type: 'success',
                  seen: false,
                  timestamp: Date.now()
                }, {
                  uid: senderData.uid,
                  title: "Transaction Successfully",
                  desc: "".concat(amount, " has been successfully sent to purse xxxxxx").concat(toAccount.toString().substr(6, 10), " ref: ").concat(transactionRefId, " Date: ").concat(new Date().toLocaleDateString()),
                  type: 'success',
                  seen: false,
                  timestamp: Date.now()
                }]; // create Receiver Notification

                receiverNotification = {
                  uid: receiverData.uid,
                  title: "Credit Alert",
                  desc: "Your purse has been credited with ".concat(amount, " from ").concat(senderData.firstName, " ").concat(senderData.lastName, " xxxxxx").concat(senderData.purseNumber.toString().substr(6, 10), " ref: ").concat(transactionRefId, ". Purpose: ").concat(purpose, " Date: ").concat(new Date().toLocaleDateString()),
                  type: 'success',
                  seen: false,
                  timestamp: Date.now()
                };
                _context7.next = 84;
                return _Mongodb["default"].insertMany('notification', [].concat(senderNotification, [receiverNotification]));

              case 84:
                sendNotification = _context7.sent;

                if (!sendNotification) {
                  console.log('unable to send notification');
                }

                return _context7.abrupt("return", response.status(200).json({
                  data: _objectSpread({}, senderTransaction, {
                    status: 'S'
                  }),
                  status: true,
                  message: "Transfer Successfully"
                }));

              case 87:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }));

      function transfer(_x14, _x15) {
        return _transfer.apply(this, arguments);
      }

      return transfer;
    }()
  }, {
    key: "initTransaction",
    value: function () {
      var _initTransaction = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee8(request, response) {
        var metadata, userData, transactionRefId, transaction, createTransaction;
        return _regenerator["default"].wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                metadata = request.body.metadata;
                userData = request.userData; // Create Transaction receipt

                transactionRefId = "FMT-".concat(userData.purseNumber.toString().substr(6, 10), "-0000-").concat(Purse.generateNumber()); // create transaction

                transaction = {
                  ref: transactionRefId,
                  status: 'P',
                  metadata: {
                    ip: Purse.getIp(),
                    useragent: request.useragent
                  },
                  timestamp: Date.now()
                };

                if (metadata) {
                  transaction.metadata = _objectSpread({}, transaction.metadata, {}, metadata);
                } // Save transaction to database


                _context8.next = 7;
                return _Mongodb["default"].insertOne('transaction', transaction);

              case 7:
                createTransaction = _context8.sent;

                if (createTransaction) {
                  _context8.next = 11;
                  break;
                }

                console.log('unable to initiate transaction');
                return _context8.abrupt("return", response.status(500).json({
                  data: '',
                  status: false,
                  message: 'unable to initiate transaction'
                }));

              case 11:
                return _context8.abrupt("return", response.status(201).json({
                  data: transactionRefId,
                  message: "success",
                  status: true
                }));

              case 12:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
      }));

      function initTransaction(_x16, _x17) {
        return _initTransaction.apply(this, arguments);
      }

      return initTransaction;
    }()
  }, {
    key: "getIp",
    value: function getIp() {
      // Try and get request origin ip address
      var ip = '';

      try {
        ip = (req.headers['x-forwarded-for'] || '').split(',').pop() || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;
        console.log("request ip address: ".concat(ip));
      } catch (error) {}

      return ip;
    }
  }, {
    key: "exchangeRate",
    value: function () {
      var _exchangeRate = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee9(request, response) {
        var pair, exchangePair;
        return _regenerator["default"].wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                pair = request.query.pair;
                _context9.next = 3;
                return _Mongodb["default"].findOne('exchange_rate', {
                  pair: pair
                });

              case 3:
                exchangePair = _context9.sent;

                if (exchangePair) {
                  _context9.next = 6;
                  break;
                }

                return _context9.abrupt("return", response.status(404).json({
                  status: false,
                  message: "pair not found",
                  data: ''
                }));

              case 6:
                return _context9.abrupt("return", response.status(200).json({
                  data: exchangePair.value,
                  message: "success",
                  status: true
                }));

              case 7:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9);
      }));

      function exchangeRate(_x18, _x19) {
        return _exchangeRate.apply(this, arguments);
      }

      return exchangeRate;
    }()
  }, {
    key: "deposit",
    value: function () {
      var _deposit = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee10(request, response) {
        var _request$body3, ref, type, from, to, fromAccountName, toAccountName, uid, amount, currency, status, method, title, desc, timestamp, metadata, userData, transaction, validateTransactionRef, failed, _failed5, updateUserPurseAccount, _failed6, proceed, _failed7, notification, notify;

        return _regenerator["default"].wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _request$body3 = request.body, ref = _request$body3.ref, type = _request$body3.type, from = _request$body3.from, to = _request$body3.to, fromAccountName = _request$body3.fromAccountName, toAccountName = _request$body3.toAccountName, uid = _request$body3.uid, amount = _request$body3.amount, currency = _request$body3.currency, status = _request$body3.status, method = _request$body3.method, title = _request$body3.title, desc = _request$body3.desc, timestamp = _request$body3.timestamp, metadata = _request$body3.metadata;
                userData = request.userData;
                transaction = {
                  ref: ref,
                  type: type,
                  from: from,
                  to: to,
                  fromAccountName: fromAccountName,
                  toAccountName: toAccountName,
                  uid: uid,
                  amount: amount,
                  currency: currency,
                  status: status,
                  method: method,
                  title: title,
                  desc: desc,
                  timestamp: timestamp,
                  metadata: metadata
                }; // validate transaction ref id

                _context10.next = 5;
                return _Mongodb["default"].findOne('transaction', {
                  ref: ref
                });

              case 5:
                validateTransactionRef = _context10.sent;

                if (validateTransactionRef) {
                  _context10.next = 11;
                  break;
                }

                _context10.next = 9;
                return Purse.onDepositFailed(transaction);

              case 9:
                failed = _context10.sent;
                return _context10.abrupt("return", response.status(500).json({
                  data: '',
                  status: false,
                  message: 'invalid transaction ref'
                }));

              case 11:
                if (!(validateTransactionRef.status == "S")) {
                  _context10.next = 16;
                  break;
                }

                _context10.next = 14;
                return Purse.onDepositFailed(transaction);

              case 14:
                _failed5 = _context10.sent;
                return _context10.abrupt("return", response.status(500).json({
                  data: '',
                  status: false,
                  message: 'transaction has already been completed'
                }));

              case 16:
                _context10.next = 18;
                return _Mongodb["default"].updateOne('account', {
                  number: userData.purseNumber,
                  purseOwner: uid
                }, {
                  '$inc': {
                    balance: amount
                  }
                });

              case 18:
                updateUserPurseAccount = _context10.sent;

                if (updateUserPurseAccount) {
                  _context10.next = 25;
                  break;
                }

                _context10.next = 22;
                return Purse.onDepositFailed(transaction);

              case 22:
                _failed6 = _context10.sent;
                console.log('unable to process transaction');
                return _context10.abrupt("return", response.status(500).json({
                  data: '',
                  status: false,
                  message: 'unable to process transaction'
                }));

              case 25:
                // update transaction 
                transaction.status = "S";
                _context10.next = 28;
                return _Mongodb["default"].updateOne('transaction', {
                  ref: ref
                }, {
                  $set: transaction
                });

              case 28:
                proceed = _context10.sent;

                if (proceed) {
                  _context10.next = 35;
                  break;
                }

                _context10.next = 32;
                return Purse.onDepositFailed(transaction);

              case 32:
                _failed7 = _context10.sent;
                console.log('unable to process transaction');
                return _context10.abrupt("return", response.status(500).json({
                  data: '',
                  status: false,
                  message: 'unable to finish transaction'
                }));

              case 35:
                // send user notifications
                notification = {
                  uid: uid,
                  title: "Credit Alert",
                  desc: "Your purse has been credited with ".concat(amount, " ").concat(currency, " ref: ").concat(ref, ". Date: ").concat(new Date().toLocaleDateString()),
                  type: 'success',
                  seen: false,
                  timestamp: Date.now()
                };
                _context10.next = 38;
                return _Mongodb["default"].insertOne('notification', notification);

              case 38:
                notify = _context10.sent;
                return _context10.abrupt("return", response.status(200).json(transaction));

              case 40:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10);
      }));

      function deposit(_x20, _x21) {
        return _deposit.apply(this, arguments);
      }

      return deposit;
    }()
  }]);
  return Purse;
}();

exports["default"] = Purse;