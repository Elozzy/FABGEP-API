"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _Mongodb = _interopRequireDefault(require("../database/Mongodb"));

var _encryptor = _interopRequireDefault(require("../helper/encryptor"));

var Purse =
/*#__PURE__*/
function () {
  function Purse() {
    (0, _classCallCheck2["default"])(this, Purse);
  }

  (0, _createClass2["default"])(Purse, null, [{
    key: "purse",
    value: function () {
      var _purse = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(request, response) {
        var uid, account, secureData;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                uid = request.query.uid;
                _context.prev = 1;
                _context.next = 4;
                return _Mongodb["default"].findOne('account', {
                  purseOwner: uid
                });

              case 4:
                account = _context.sent;

                if (!account) {
                  response.status(404).json({
                    status: false,
                    data: '',
                    message: 'document not found'
                  });
                }

                secureData = _encryptor["default"].dataEncrypt(JSON.stringify(account));
                response.status(200).json({
                  status: true,
                  data: secureData,
                  message: 'success'
                });
                _context.next = 13;
                break;

              case 10:
                _context.prev = 10;
                _context.t0 = _context["catch"](1);
                response.status(500).json({
                  status: false,
                  data: _context.t0,
                  message: 'error occurred'
                });

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[1, 10]]);
      }));

      function purse(_x, _x2) {
        return _purse.apply(this, arguments);
      }

      return purse;
    }()
  }]);
  return Purse;
}();

exports["default"] = Purse;