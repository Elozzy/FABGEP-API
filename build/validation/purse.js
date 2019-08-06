"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _util = require("util");

/**
 * @description isEmpty check for empty input field
 * @return { boolean }
 */
var isEmpty = function isEmpty(value) {
  return value === undefined || value === null || (0, _typeof2["default"])(value) === 'object' && Object.keys(value).length === 0 || typeof value === 'string' && value.trim().length === 0;
};

var isValidEmail = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,10})$/;
var isIntegar = /^(?:[1-9]\d*|\d)$/;
var isValidAlphabet = /^[a-zA-Z ]*$/;
var isValidName = /^[a-zA-Z]{3,15}$/;
var isValidPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
var whiteSpace = /\s/g;
var isBoolean = /^(true|false|1|0)$/;
var isValidPhone = /^[0-9]{8,16}$/;

var PurseValidator =
/*#__PURE__*/
function () {
  function PurseValidator() {
    (0, _classCallCheck2["default"])(this, PurseValidator);
  }

  (0, _createClass2["default"])(PurseValidator, null, [{
    key: "purse",
    value: function purse(request, response, next) {
      var uid = request.query.uid;

      if (Object.keys(request.query).length > 1) {
        response.status(400).json({
          status: false,
          message: 'less data required',
          data: ''
        });
      }

      if (isEmpty(uid)) {
        response.status(400).json({
          status: false,
          message: 'empty request',
          data: ''
        });
      }

      next();
    }
  }, {
    key: "transactions",
    value: function transactions(request, response, next) {
      var uid = request.body.uid;

      if (Object.keys(request.body).length > 2) {
        response.status(400).json({
          status: false,
          message: 'uid and limit is required',
          data: ''
        });
      }

      if (isEmpty(uid) || isEmpty(limit)) {
        response.status(400).json({
          status: false,
          message: "uid and limit can't be left empty",
          data: ''
        });
      }

      if ((0, _util.isNumber)(limit)) {
        response.status(400).json({
          status: false,
          message: "limit mush be an integer value",
          data: ''
        });
      }

      next();
    }
  }]);
  return PurseValidator;
}();

exports["default"] = PurseValidator;