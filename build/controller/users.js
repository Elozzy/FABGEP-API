"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _Mongodb = _interopRequireDefault(require("../database/Mongodb"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var Users =
  /*#__PURE__*/
  function () {
    function Users() {
      (0, _classCallCheck2["default"])(this, Users);
    }

    (0, _createClass2["default"])(Users, null, [{
      key: "userSignup",
      value: function () {
        var _userSignup = (0, _asyncToGenerator2["default"])(
          /*#__PURE__*/
          _regenerator["default"].mark(function _callee(request, response) {
            var userData, result, data, token;
            return _regenerator["default"].wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.prev = 0;
                    userData = _objectSpread({}, request.body);
                    _context.next = 4;
                    return _Mongodb["default"].insert('users', userData);

                  case 4:
                    result = _context.sent;
                    data = _objectSpread({}, result.ops[0]);
                    token = _jsonwebtoken["default"].sign(data, 'foodmoni');
                    return _context.abrupt("return", response.status(200).json({
                      status: true, data: '',
                      token: token,
                      data: data
                    }));

                  case 10:
                    _context.prev = 10;
                    _context.t0 = _context["catch"](0);
                    return _context.abrupt("return", response.status(500).json({
                      status: 500,
                      message: 'Service not available'
                    }));

                  case 13:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, null, [[0, 10]]);
          }));

        function userSignup(_x, _x2) {
          return _userSignup.apply(this, arguments);
        }

        return userSignup;
      }()
    }, {
      key: "userLogin",
      value: function userLogin(request, response) { }
    }, {
      key: "userProfile",
      value: function userProfile(request, response) { }
    }]);
    return Users;
  }();

var _default = Users;
exports["default"] = _default;