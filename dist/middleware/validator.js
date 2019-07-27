'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _validator = require('../classes/validator');

var _validator2 = _interopRequireDefault(_validator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Validation = function () {
    function Validation() {
        _classCallCheck(this, Validation);
    }

    _createClass(Validation, null, [{
        key: 'createAccount',
        value: function createAccount(req, res, next) {
            var result = _validator2.default.stepOneUserRegistration(req.body);
            if (result.error) {
                return res.status(404).json({ status: 404, error: result.error.details[0].message });
            }
            return next();
        }
    }, {
        key: 'login',
        value: function login(req, res, next) {
            var result = _validator2.default.login(req.body);
            if (result.error) {
                return res.status(404).json({ status: 404, error: result.error.details[0].message });
            }
            return next();
        }
    }]);

    return Validation;
}();

module.export = Validation;