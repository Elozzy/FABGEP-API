"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Token =
/*#__PURE__*/
function () {
  function Token() {
    _classCallCheck(this, Token);
  }

  _createClass(Token, null, [{
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
          error: "Authorization failed, Please Login"
        });
      }
    }
  }]);

  return Token;
}();

var _default = Token;
exports["default"] = _default;