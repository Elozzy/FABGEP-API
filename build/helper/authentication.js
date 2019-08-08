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

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _Mongodb = _interopRequireDefault(require("../database/Mongodb"));

var jwtKey = "(88200819970317@CyberCop);;;;;;;;;;;";

var isEmpty = function isEmpty(value) {
  return value === undefined || value === null || (0, _typeof2["default"])(value) === 'object' && Object.keys(value).length === 0 || typeof value === 'string' && value.trim().length === 0;
};

var isValidEmail = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,10})$/;
var isIntegar = /^(?:[1-9]\d*|\d)$/;
var isMoney = /^\d{0,6}(\.\d{0,2}){0,1}$/;
var isValidAlphabet = /^[a-zA-Z ]*$/;
var isValidName = /^[a-zA-Z]{3,15}$/;
var isValidPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
var whiteSpace = /\s/g;
var isBoolean = /^(true|false|1|0)$/;
var isValidPhone = /^[0-9]{8,16}$/;

var Authentication =
/*#__PURE__*/
function () {
  function Authentication() {
    (0, _classCallCheck2["default"])(this, Authentication);
  }

  (0, _createClass2["default"])(Authentication, null, [{
    key: "isAuthenticated",
    value: function () {
      var _isAuthenticated = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(request, response, next) {
        var authorization, userCredentials, user;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                authorization = request.headers.authorization;

                if (!isEmpty(authorization)) {
                  _context.next = 4;
                  break;
                }

                return _context.abrupt("return", response.status(401).json({
                  status: false,
                  message: "Authentication required",
                  data: ''
                }));

              case 4:
                userCredentials = _jsonwebtoken["default"].verify(authorization, jwtKey);

                if (userCredentials) {
                  _context.next = 7;
                  break;
                }

                return _context.abrupt("return", response.status(401).json({
                  status: false,
                  message: "Authentication required",
                  data: ''
                }));

              case 7:
                _context.next = 9;
                return _Mongodb["default"].findOne('users', {
                  uid: userCredentials.uid,
                  pwd: userCredentials.pwd
                });

              case 9:
                user = _context.sent;

                if (user) {
                  _context.next = 12;
                  break;
                }

                return _context.abrupt("return", response.status(401).json({
                  status: false,
                  message: "Authentication required",
                  data: ''
                }));

              case 12:
                request.userData = user;
                next();
                _context.next = 19;
                break;

              case 16:
                _context.prev = 16;
                _context.t0 = _context["catch"](0);
                return _context.abrupt("return", response.status(401).json({
                  status: false,
                  message: "Authentication required",
                  data: ''
                }));

              case 19:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 16]]);
      }));

      function isAuthenticated(_x, _x2, _x3) {
        return _isAuthenticated.apply(this, arguments);
      }

      return isAuthenticated;
    }()
  }, {
    key: "tokenAuthentication",
    value: function () {
      var _tokenAuthentication = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2(request, response, next) {
        var authorization, userCredentials, user;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                authorization = request.headers.authorization;

                if (!isEmpty(authorization)) {
                  _context2.next = 4;
                  break;
                }

                return _context2.abrupt("return", response.status(401).json({
                  status: false,
                  message: "Authentication required",
                  data: ''
                }));

              case 4:
                userCredentials = _jsonwebtoken["default"].verify(authorization, jwtKey);

                if (userCredentials) {
                  _context2.next = 7;
                  break;
                }

                return _context2.abrupt("return", response.status(401).json({
                  status: false,
                  message: "Authentication required",
                  data: ''
                }));

              case 7:
                _context2.next = 9;
                return _Mongodb["default"].findOne('users', {
                  uid: userCredentials.uid,
                  pwd: userCredentials.pwd
                });

              case 9:
                user = _context2.sent;

                if (user) {
                  _context2.next = 12;
                  break;
                }

                return _context2.abrupt("return", response.status(401).json({
                  status: false,
                  message: "Authentication required",
                  data: ''
                }));

              case 12:
                // delete sensitive information form object
                delete user['pwd'];
                delete user['pin'];
                return _context2.abrupt("return", response.status(200).json({
                  status: true,
                  message: "valid",
                  data: user
                }));

              case 17:
                _context2.prev = 17;
                _context2.t0 = _context2["catch"](0);
                return _context2.abrupt("return", response.status(401).json({
                  status: false,
                  message: "Authentication required",
                  data: ''
                }));

              case 20:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 17]]);
      }));

      function tokenAuthentication(_x4, _x5, _x6) {
        return _tokenAuthentication.apply(this, arguments);
      }

      return tokenAuthentication;
    }()
  }]);
  return Authentication;
}();

exports["default"] = Authentication;