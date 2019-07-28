"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var Token =
/*#__PURE__*/
function () {
  function Token() {
    (0, _classCallCheck2["default"])(this, Token);
  }

  (0, _createClass2["default"])(Token, null, [{
    key: "checkToken",
    value: function checkToken(request, response, next) {
      try {
        var token = request.headers.authorization.split(' ')[1];

        var decoded = _jsonwebtoken["default"].verify(token, process.env.JWT_SECRET);

        request.userData = decoded;
        next();
      } catch (error) {
        return response.status(401).json({
          status: 401,
          data: '',
          message: "Authorization failed, Please Login"
        });
      }
    }
  }]);
  return Token;
}();

var _default = Token;
exports["default"] = _default;
3;