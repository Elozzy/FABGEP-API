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
var isValidAlphabet = /^[a-zA-Z ]*$/;
var isValidName = /^[a-zA-Z]{3,15}$/;
var isValidPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
var whiteSpace = /\s/g;
var isBoolean = /^(true|false|1|0)$/;
var isValidPhone = /^[0-9]{8,16}$/;

var Notification =
/*#__PURE__*/
function () {
  function Notification() {
    (0, _classCallCheck2["default"])(this, Notification);
  }

  (0, _createClass2["default"])(Notification, null, [{
    key: "notification",
    value: function notification(request, response, next) {
      var _request$body = request.body,
          id = _request$body.id,
          title = _request$body.title,
          desc = _request$body.desc,
          uid = _request$body.uid,
          type = _request$body.type,
          seen = _request$body.seen,
          timestamp = _request$body.timestamp;

      if (Object.keys(request.body).length > 7) {
        return response.status(400).json({
          status: false,
          data: '',
          message: 'Only  title, desc, type, seen, timestamp, id and _id that is required'
        });
      }

      if (isEmpty(id)) {
        return response.status(400).json({
          status: false,
          data: '',
          message: "id can't be left empty"
        });
      }

      if (isEmpty(uid)) {
        return response.status(400).json({
          status: false,
          data: '',
          message: "uid can't be left empty"
        });
      }

      if (isEmpty(title)) {
        return response.status(400).json({
          status: false,
          data: '',
          message: "title can't be left empty"
        });
      }

      if (isEmpty(desc)) {
        return response.status(400).json({
          status: false,
          data: '',
          message: "desc can't be left empty"
        });
      }

      if (isEmpty(type)) {
        return response.status(400).json({
          status: false,
          data: '',
          message: "type can't be left empty"
        });
      }

      if (isEmpty(seen)) {
        return response.status(400).json({
          status: false,
          data: '',
          message: "seen can't be left empty"
        });
      }

      if (isEmpty(timestamp)) {
        return response.status(400).json({
          status: false,
          data: '',
          message: "timestamp can't be left empty"
        });
      }

      if (!isBoolean.test(seen)) {
        return response.status(400).json({
          status: false,
          data: '',
          message: "seen is not a valid data type of boolean"
        });
      }

      next();
    }
  }, {
    key: "notifications",
    value: function notifications(request, response, next) {
      var _request$body2 = request.body,
          query = _request$body2.query,
          limit = _request$body2.limit;

      if (Object.keys(request.body).length > 2) {
        return response.status(400).json({
          status: false,
          data: '',
          message: 'Only  title, desc, type, seen, timestamp, id and _id that is required'
        });
      }

      if (isEmpty(query)) {
        return response.status(400).json({
          status: false,
          data: '',
          message: "query can't be left empty"
        });
      }

      if (isEmpty(limit)) {
        return response.status(400).json({
          status: false,
          data: '',
          message: "limit can't be left empty"
        });
      }

      if (!isInteger.test(limit)) {
        return response.status(400).json({
          status: false,
          data: '',
          message: "limit is not a valid data type of integer"
        });
      }

      next();
    }
  }]);
  return Notification;
}();

exports["default"] = Notification;