"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _Mongodb = _interopRequireDefault(require("../database/Mongodb"));

var _cookiejar = require("cookiejar");

var _encryptor = _interopRequireDefault(require("../helper/encryptor"));

var _v = _interopRequireDefault(require("uuid/v4"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var jwtKey = "88200819970317";

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
        var userData, checkEmail, purseNumber, purse, createUserAccount, createPurseAccount, token;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                userData = (0, _extends2["default"])({}, request.body); // set user unique identification number

                userData.uid = (0, _v["default"])(); // check if email is already in use by someone else

                _context2.next = 5;
                return _Mongodb["default"].findOne('users', {
                  email: userData.email
                });

              case 5:
                checkEmail = _context2.sent;

                if (!(checkEmail != null)) {
                  _context2.next = 8;
                  break;
                }

                return _context2.abrupt("return", response.status(409).json({
                  'status': false,
                  'message': "email already in use"
                }));

              case 8:
                _context2.next = 10;
                return Users.generateNumber();

              case 10:
                purseNumber = _context2.sent;
                // link purse number to user account
                userData.purseNumber = purseNumber;
                purse = {
                  number: purseNumber,
                  balance: 0.0,
                  bonusBalance: 0.0,
                  purseOwner: userData.uid,
                  createTimestamp: Date.now(),
                  lastUpdateTimestamp: Date.now() // storing user account into the database

                };
                _context2.next = 15;
                return _Mongodb["default"].insertOne('users', userData);

              case 15:
                createUserAccount = _context2.sent;

                if (createUserAccount) {
                  _context2.next = 19;
                  break;
                }

                console.log("error occurred creating user account ".concat(userData));
                return _context2.abrupt("return", response.status(500).json({
                  status: false,
                  message: 'error occurred setting up account',
                  'data': ''
                }));

              case 19:
                _context2.next = 21;
                return _Mongodb["default"].insertOne('account', purse);

              case 21:
                createPurseAccount = _context2.sent;

                if (createPurseAccount) {
                  _context2.next = 25;
                  break;
                }

                console.log("error occurred creating pure account ".concat(createPurseAccount));
                return _context2.abrupt("return", response.status(500).json({
                  status: false,
                  message: 'error occurred setting up account',
                  'data': ''
                }));

              case 25:
                // generating token to access userData on other routes
                token = _jsonwebtoken["default"].sign({
                  uid: userData.uid,
                  pwd: userData.pwd
                }, jwtKey); // return user token

                return _context2.abrupt("return", response.status(201).json({
                  'status': true,
                  data: token,
                  'message': "success"
                }));

              case 29:
                _context2.prev = 29;
                _context2.t0 = _context2["catch"](0);
                return _context2.abrupt("return", response.status(500).json({
                  status: false,
                  message: 'error occurred',
                  'data': _context2.t0
                }));

              case 32:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 29]]);
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
        var loginData, checkEmail, comparePassword, pwd, payload, token;
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
                checkEmail = _context3.sent;

                if (checkEmail) {
                  _context3.next = 7;
                  break;
                }

                return _context3.abrupt("return", response.status(409).json({
                  'status': false,
                  'message': "Incorrect email address or password"
                }));

              case 7:
                // decrypt and compare password
                comparePassword = _encryptor["default"].compare(loginData.pwd, checkEmail.pwd);

                if (comparePassword) {
                  _context3.next = 10;
                  break;
                }

                return _context3.abrupt("return", response.status(409).json({
                  'status': false,
                  'message': "Incorrect email address or password"
                }));

              case 10:
                pwd = checkEmail.pwd, payload = (0, _objectWithoutProperties2["default"])(checkEmail, ["pwd"]); // generating token to access userData on other routes

                token = _jsonwebtoken["default"].sign(payload, 'foodmoni'); // return data Object

                return _context3.abrupt("return", response.status(200).json({
                  'status': true,
                  data: payload,
                  token: token,
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
    value: function userProfile(request, response) {}
  }]);
  return Users;
}();

var _default = Users;
exports["default"] = _default;