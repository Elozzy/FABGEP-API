"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _Mongodb = _interopRequireDefault(require("../database/Mongodb"));

var _encryptor = _interopRequireDefault(require("../helper/encryptor"));

var _v = _interopRequireDefault(require("uuid/v4"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var jwtKey = "(88200819970317@CyberCop);;;;;;;;;;;";

var Users =
/*#__PURE__*/
function () {
  function Users() {
    (0, _classCallCheck2["default"])(this, Users);
  }

  (0, _createClass2["default"])(Users, null, [{
    key: "generateNumber",
    value: function () {
      var _generateNumber = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee() {
        var random, sub, salt, num, checkIfGeneratedPurseNumberIsValid;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                random = Date.now().toString();
                sub = random.substr(6, random.length);
                salt = Math.floor(100 + Math.random() * 900);
                num = Number("".concat(salt).concat(sub));
                _context.next = 6;
                return _Mongodb["default"].findOne('purse', {
                  number: num
                });

              case 6:
                checkIfGeneratedPurseNumberIsValid = _context.sent;

                if (!(checkIfGeneratedPurseNumberIsValid != null)) {
                  _context.next = 12;
                  break;
                }

                console.log("getting new Number => Previous ".concat(num));
                return _context.abrupt("return", Users.generateNumber());

              case 12:
                return _context.abrupt("return", num);

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function generateNumber() {
        return _generateNumber.apply(this, arguments);
      }

      return generateNumber;
    }()
  }, {
    key: "userSignup",
    value: function () {
      var _userSignup = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2(request, response) {
        var userData, checkEmail, encryptedPassword, purseNumber, purse, createUserAccount, createPurseAccount, getNewData, token;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                userData = (0, _extends2["default"])({}, request.body); // set user unique identification number

                userData.uid = (0, _v["default"])(); // set timestamp

                userData.timestamp = Date.now(); // check if email is already in use by someone else

                _context2.next = 6;
                return _Mongodb["default"].findOne('users', {
                  email: userData.email
                });

              case 6:
                checkEmail = _context2.sent;

                if (!(checkEmail != null)) {
                  _context2.next = 9;
                  break;
                }

                return _context2.abrupt("return", response.status(409).json({
                  'status': false,
                  'message': "email already in use"
                }));

              case 9:
                // encrypted user password  
                encryptedPassword = _encryptor["default"].encrypt(userData.pwd);
                userData.pwd = encryptedPassword; // generate a purse number 

                _context2.next = 13;
                return Users.generateNumber();

              case 13:
                purseNumber = _context2.sent;
                // link purse number to user account
                userData.purseNumber = purseNumber;
                purse = {
                  number: purseNumber,
                  balance: 0.0,
                  bonusBalance: 0.0,
                  bonusLock: true,
                  purseLock: false,
                  purseOwner: userData.uid,
                  createTimestamp: Date.now(),
                  lastUpdateTimestamp: Date.now() // storing user account into the database

                };
                _context2.next = 18;
                return _Mongodb["default"].insertOne('users', userData);

              case 18:
                createUserAccount = _context2.sent;

                if (createUserAccount) {
                  _context2.next = 22;
                  break;
                }

                console.log("error occurred creating user account ".concat(userData));
                return _context2.abrupt("return", response.status(500).json({
                  status: false,
                  message: 'error occurred setting up account',
                  'data': ''
                }));

              case 22:
                _context2.next = 24;
                return _Mongodb["default"].insertOne('account', purse);

              case 24:
                createPurseAccount = _context2.sent;

                if (createPurseAccount) {
                  _context2.next = 28;
                  break;
                }

                console.log("error occurred creating pure account ".concat(createPurseAccount));
                return _context2.abrupt("return", response.status(500).json({
                  status: false,
                  message: 'error occurred setting up account',
                  'data': ''
                }));

              case 28:
                _context2.next = 30;
                return _Mongodb["default"].findOne('users', {
                  uid: userData.uid
                });

              case 30:
                getNewData = _context2.sent;
                // generating token to access userData on other routes
                token = _jsonwebtoken["default"].sign({
                  uid: userData.uid,
                  pwd: userData.pwd
                }, jwtKey); // return user token

                return _context2.abrupt("return", response.status(201).json({
                  'status': true,
                  data: {
                    token: token,
                    data: getNewData
                  },
                  'message': "success"
                }));

              case 35:
                _context2.prev = 35;
                _context2.t0 = _context2["catch"](0);
                return _context2.abrupt("return", response.status(500).json({
                  status: false,
                  message: 'error occurred',
                  'data': _context2.t0
                }));

              case 38:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 35]]);
      }));

      function userSignup(_x, _x2) {
        return _userSignup.apply(this, arguments);
      }

      return userSignup;
    }()
  }, {
    key: "userLogin",
    value: function () {
      var _userLogin = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee3(request, response) {
        var loginData, data, comparePassword, token;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                loginData = _objectSpread({}, request.body); // check email

                _context3.next = 4;
                return _Mongodb["default"].findOne('users', {
                  email: loginData.email
                });

              case 4:
                data = _context3.sent;

                if (data) {
                  _context3.next = 7;
                  break;
                }

                return _context3.abrupt("return", response.status(401).json({
                  'status': false,
                  'message': "Incorrect email address or password"
                }));

              case 7:
                // decrypt and compare password
                comparePassword = _encryptor["default"].compare(loginData.pwd, data.pwd);

                if (comparePassword) {
                  _context3.next = 10;
                  break;
                }

                return _context3.abrupt("return", response.status(401).json({
                  'status': false,
                  'message': "Incorrect email address or password"
                }));

              case 10:
                // generating token to access userData on other routes
                token = _jsonwebtoken["default"].sign(data, jwtKey); // delete pwd form object

                delete data['pwd']; // return data Object

                return _context3.abrupt("return", response.status(200).json({
                  'status': true,
                  data: {
                    token: token,
                    data: data
                  },
                  'message': "Login was successful"
                }));

              case 15:
                _context3.prev = 15;
                _context3.t0 = _context3["catch"](0);
                return _context3.abrupt("return", response.status(500).json({
                  status: false,
                  message: 'error occurred',
                  'data': _context3.t0
                }));

              case 18:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 15]]);
      }));

      function userLogin(_x3, _x4) {
        return _userLogin.apply(this, arguments);
      }

      return userLogin;
    }()
  }, {
    key: "userProfile",
    value: function () {
      var _userProfile = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee4(request, response) {
        var uid, data;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                uid = request.query.uid;
                _context4.next = 4;
                return _Mongodb["default"].findOne('users', {
                  uid: uid
                });

              case 4:
                data = _context4.sent;

                if (data) {
                  _context4.next = 7;
                  break;
                }

                return _context4.abrupt("return", response.status(404).json({
                  status: false,
                  message: 'no document found',
                  'data': data
                }));

              case 7:
                return _context4.abrupt("return", response.status(200).json({
                  'status': true,
                  data: data,
                  'message': "document found"
                }));

              case 10:
                _context4.prev = 10;
                _context4.t0 = _context4["catch"](0);
                return _context4.abrupt("return", response.status(500).json({
                  status: false,
                  message: 'error occurred',
                  'data': _context4.t0
                }));

              case 13:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[0, 10]]);
      }));

      function userProfile(_x5, _x6) {
        return _userProfile.apply(this, arguments);
      }

      return userProfile;
    }()
  }]);
  return Users;
}();

var _default = Users;
exports["default"] = _default;