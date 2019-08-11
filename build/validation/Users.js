"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

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
var isValidPin = /^[0-9]{4,4}$/;
var whiteSpace = /\s/g;
var isBoolean = /^(true|false|1|0)$/;
var isValidPhone = /^[0-9]{8,16}$/;

var UserValidation =
/*#__PURE__*/
function () {
  function UserValidation() {
    (0, _classCallCheck2["default"])(this, UserValidation);
  }

  (0, _createClass2["default"])(UserValidation, null, [{
    key: "userSignup",
    value: function userSignup(request, response, next) {
      /**
       * @description Validate user signup details 
       * @param { Object } request contains the user details
       * @param { Object } response contains response sent to the user
       * @return { json }
      */
      console.log(request.body);
      var _request$body = request.body,
          firstName = _request$body.firstName,
          lastName = _request$body.lastName,
          email = _request$body.email,
          pwd = _request$body.pwd,
          pin = _request$body.pin;
      console.log(Object.keys(request.body).length);

      if (Object.keys(request.body).length > 7) {
        return response.status(400).json({
          status: false,
          data: '',
          message: 'Only First Name, Last Name, Middle name Email Password and Pin is required'
        });
      }

      if (isEmpty(firstName) && isEmpty(lastName) && isEmpty(email) && isEmpty(pwd) && isEmpty(phone)) {
        return response.status(400).json({
          status: false,
          data: '',
          message: 'First Name, Last Name, Email, Password and Phone number field are required'
        });
      }

      if (isEmpty(firstName)) {
        return response.status(400).json({
          status: false,
          data: '',
          message: 'First name is required'
        });
      }

      if (!isValidAlphabet.test(firstName)) {
        return response.status(422).json({
          status: false,
          data: '',
          message: 'First name can only contain alphabets'
        });
      }

      if (!isValidName.test(firstName)) {
        return response.status(422).json({
          status: false,
          data: '',
          message: 'First name should not contain spaces and mush be more than 3 and less than 15 characters'
        });
      }

      if (isEmpty(lastName)) {
        return response.status(400).json({
          status: false,
          data: '',
          message: 'Last name is required'
        });
      }

      if (!isValidAlphabet.test(lastName)) {
        return response.status(422).json({
          status: false,
          data: '',
          message: 'Last name can only contain alphabets'
        });
      }

      if (!isValidName.test(lastName)) {
        return response.status(422).json({
          status: false,
          data: '',
          message: 'Last name should not contain spaces and mush be more than 3 and less than 15 characters'
        });
      }

      if (isEmpty(pwd)) {
        return response.status(400).json({
          status: false,
          data: '',
          message: 'Password is required'
        });
      }

      if (!isValidPassword.test(pwd)) {
        return response.status(422).json({
          status: false,
          data: '',
          message: 'Password should contain minimum eight characters, at least one letter and one number:'
        });
      }

      if (isEmpty(pin)) {
        return response.status(400).json({
          status: false,
          data: '',
          message: 'Pin is required'
        });
      } // if (!isValidPin.test(pin)) {
      //     return response.status(422).json({
      //         status: false,
      //         data: '',
      //         message: 'Pin should contain four numbers only'
      //     })
      // }


      if (isEmpty(email)) {
        return response.status(400).json({
          status: false,
          data: '',
          message: 'Email is required'
        });
      }

      if (!isValidEmail.test(email)) {
        return response.status(422).json({
          status: false,
          data: '',
          message: 'Invalid email address'
        });
      } // if(isEmpty(phone)){
      //     return response.status(400).json({
      //         status: false,data: '',
      //         message: 'Phone number is required'
      //     })
      // }
      // if(!isValidPhone.test(phone)){
      //     return response.status(422).json({
      //         status: false,data:'',
      //         message: 'Invalid phone number, phone number should not be less than 8 and more than 16'
      //     })
      // }
      // if(!isBoolean.test(isAdmin)){
      //     return response.status(422).json({
      //         status: false,data:'',
      //         message: 'Invalid input, isAdmin can only be false or false'
      //     })
      // }


      next();
    }
  }, {
    key: "userLogin",
    value: function userLogin(request, response, next) {
      var _request$body2 = request.body,
          email = _request$body2.email,
          pwd = _request$body2.pwd;

      if (Object.keys(request.body).length > 2) {
        return response.status(400).json({
          status: false,
          data: '',
          message: 'Only Email and Password is required'
        });
      }

      if (isEmpty(email)) {
        return response.status(400).json({
          status: false,
          data: '',
          message: 'Email is required'
        });
      }

      if (!isValidEmail.test(email)) {
        return response.status(422).json({
          status: false,
          data: '',
          message: 'Invalid email address'
        });
      }

      if (isEmpty(pwd)) {
        return response.status(400).json({
          status: false,
          data: '',
          message: 'Password is required'
        });
      }

      if (!isValidPassword.test(pwd)) {
        return response.status(422).json({
          status: false,
          data: '',
          message: 'Password should contain minimum eight characters, at least one letter and one number:'
        });
      }

      next();
    }
  }]);
  return UserValidation;
}();

module.exports = UserValidation;