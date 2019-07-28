"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var salt = _bcryptjs["default"].genSaltSync(10);
/**
 * @description Encrypt data and compare
 */


var Encryptor =
/*#__PURE__*/
function () {
  function Encryptor() {
    (0, _classCallCheck2["default"])(this, Encryptor);
  }

  (0, _createClass2["default"])(Encryptor, null, [{
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