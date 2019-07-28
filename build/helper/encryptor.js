"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var salt = _bcryptjs["default"].genSaltSync(10);
/**
 * @description Encrypt data and compare
 */


var Encryptor =
/*#__PURE__*/
function () {
  function Encryptor() {
    _classCallCheck(this, Encryptor);
  }

  _createClass(Encryptor, null, [{
    key: "encrypt",

    /**
     * @description Encryt user data passed as parameter
     * @param { Object } data 
     * @return { String } encryted data
     */
    value: function encrypt(data) {
      var encryted = _bcryptjs["default"].hashSync(data, salt);

      return encryted;
    }
  }, {
    key: "compare",
    value: function compare(_compare, hash) {
      /**
       * @description
       * @param { compare } data to compare
       * @param { hash } data hash to compare with
       */
      var decrypted = _bcryptjs["default"].compareSync(_compare, hash);

      return decrypted;
    }
  }]);

  return Encryptor;
}();

var _default = Encryptor;
exports["default"] = _default;