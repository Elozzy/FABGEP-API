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
var isInteger = /^(?:[1-9]\d*|\d)$/;
var isMoney = /^\d{0,6}(\.\d{0,2}){0,1}$/;
var isValidAlphabet = /^[a-zA-Z ]*$/;
var isValidName = /^[a-zA-Z]{3,15}$/;
var isValidPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
var whiteSpace = /\s/g;
var isBoolean = /^(true|false|1|0)$/;
var isValidPhone = /^[0-9]{8,16}$/;
var isAccountNumber = /^[0-9]{10}$/;

var PurseValidator =
/*#__PURE__*/
function () {
  function PurseValidator() {
    (0, _classCallCheck2["default"])(this, PurseValidator);
  }

  (0, _createClass2["default"])(PurseValidator, null, [{
    key: "userProfile",
    value: function userProfile(request, response, next) {
      var uid = request.userData.uid;

      if (Object.keys(request.query).length > 1) {
        return response.status(400).json({
          status: false,
          data: '',
          message: 'Only uid required'
        });
      }

      if (isEmpty(uid)) {
        return response.status(400).json({
          status: false,
          data: '',
          message: 'uid is required'
        });
      }

      next();
    }
  }, {
    key: "purse",
    value: function purse(request, response, next) {
      var uid = request.query.uid;

      if (Object.keys(request.query).length > 1) {
        return response.status(400).json({
          status: false,
          message: 'less data required',
          data: ''
        });
      }

      if (isEmpty(uid)) {
        return response.status(400).json({
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
      var uid = request.userData.uid;
      var limit = request.query.limit;

      if (isEmpty(uid) || isEmpty(limit)) {
        return response.status(400).json({
          status: false,
          message: "uid and limit can't be left empty",
          data: ''
        });
      }

      if (!_util.isNumber.test(limit)) {
        return response.status(400).json({
          status: false,
          message: "limit mush be an integer value",
          data: ''
        });
      }

      next();
    }
  }, {
    key: "transfer",
    value: function transfer(request, response, next) {
      var _request$body = request.body,
          amount = _request$body.amount,
          toAccount = _request$body.toAccount,
          pin = _request$body.pin,
          purpose = _request$body.purpose;

      if (Object.keys(request.body).length > 4) {
        return response.status(400).json({
          status: false,
          message: 'less data required',
          data: ''
        });
      }

      if (isEmpty(amount) || isEmpty(toAccount) || isEmpty(pin) || isEmpty(purpose)) {
        return response.status(400).json({
          status: false,
          message: 'amount,pin, purpose  and to account is required',
          data: ''
        });
      }

      if (Number(amount) < 0) {
        return response.status(400).json({
          status: false,
          message: 'amount is invalid',
          data: ''
        });
      }

      if (!isMoney.test(amount)) {
        return response.status(400).json({
          status: false,
          message: 'amount mush be a double',
          data: ''
        });
      }

      if (!isAccountNumber.test(toAccount)) {
        return response.status(400).json({
          status: false,
          message: 'invalid account number',
          data: ''
        });
      } // parse amount to valid number


      request.body.amount = Number(amount);
      console.log(request.body);
      next();
    }
  }]);
  return PurseValidator;
}();

exports["default"] = PurseValidator;