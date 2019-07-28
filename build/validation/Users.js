"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * @description isEmpty check for empty input field
 * @return { boolean }
 */
var isEmpty = function isEmpty(value) {
  return value === undefined || value === null || _typeof(value) === 'object' && Object.keys(value).length === 0 || typeof value === 'string' && value.trim().length === 0;
};

var isValidEmail = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,10})$/;
var isIntegar = /^(?:[1-9]\d*|\d)$/;
var isValidAlphabet = /^[a-zA-Z ]*$/;
var isValidName = /^[a-zA-Z]{3,15}$/;
var isValidPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
var whiteSpace = /\s/g;
var isBoolean = /^(true|false|1|0)$/;
var isValidPhone = /^[0-9]{8,16}$/;

var UserValidation =
/*#__PURE__*/
function () {
  function UserValidation() {
    _classCallCheck(this, UserValidation);
  }

  _createClass(UserValidation, null, [{
    key: "userSignup",
    value: function userSignup(request, response, next) {
      /**
      * @description Valdiate user signup details 
      * @param { Object } request contains the user details
      * @param { Object } response contains response sent to the user
      * @return { json }
      */
      var _request$body = request.body,
          firstName = _request$body.firstName,
          lastName = _request$body.lastName,
          email = _request$body.email,
          password = _request$body.password,
          phone = _request$body.phone,
          isAdmin = _request$body.isAdmin;

      if (Object.keys(request.body).length > 6) {
        return response.status(400).json({
          status: 400,
          error: 'Only First Name, Last Name, Email and Password is required'
        });
      }

      if (isEmpty(firstName) && isEmpty(lastName) && isEmpty(email) && isEmpty(password) && isEmpty(phone)) {
        return response.status(400).json({
          status: 400,
          error: 'First Name, Last Name, Email, Password and Phone number field are required'
        });
      }

      if (isEmpty(firstName)) {
        return response.status(400).json({
          status: 400,
          error: 'First name is required'
        });
      }

      if (!isValidAlphabet.test(firstName)) {
        return response.status(422).json({
          status: 422,
          error: 'First name can only contain alphabets'
        });
      }

      if (!isValidName.test(firstName)) {
        return response.status(422).json({
          status: 422,
          error: 'First name should not contain spaces and be less than 3 or more than 15'
        });
      }

      if (isEmpty(lastName)) {
        return response.status(400).json({
          status: 400,
          error: 'Last name is required'
        });
      }

      if (!isValidAlphabet.test(lastName)) {
        return response.status(422).json({
          status: 422,
          error: 'Last name can only contain alphabets'
        });
      }

      if (!isValidName.test(lastName)) {
        return response.status(422).json({
          status: 422,
          error: 'Last name should not contain spaces be less than 3 or greater than 15'
        });
      }

      if (isEmpty(password)) {
        return response.status(400).json({
          status: 400,
          error: 'Password is required'
        });
      }

      if (!isValidPassword.test(password)) {
        return response.status(422).json({
          status: 422,
          error: 'Password should contain m`inimum eight characters, at least one letter and one number:'
        });
      }

      if (isEmpty(email)) {
        return response.status(400).json({
          status: 400,
          error: 'Email is required'
        });
      }

      if (!isValidEmail.test(email)) {
        return response.status(422).json({
          status: 422,
          error: 'Invalid email address'
        });
      }

      if (isEmpty(phone)) {
        return response.status(400).json({
          status: 400,
          error: 'Phone number is required'
        });
      }

      if (!isValidPhone.test(phone)) {
        return response.status(422).json({
          status: 422,
          error: 'Invalid phone number, phone number should not be less than 8 and more than 16'
        });
      }

      if (!isBoolean.test(isAdmin)) {
        return response.status(422).json({
          status: 422,
          error: 'Invalid input, isAdmin can only be true or false'
        });
      }

      next();
    }
  }, {
    key: "userLogin",
    value: function userLogin(request, response, next) {}
  }, {
    key: "userProfile",
    value: function userProfile(request, response, next) {}
  }]);

  return UserValidation;
}();

var _default = UserValidation;
exports["default"] = _default;