'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var joi = require('@hapi/joi');

var Validator = function () {
    function Validator() {
        _classCallCheck(this, Validator);
    }

    _createClass(Validator, null, [{
        key: 'login',
        value: function login(data) {
            var schema = joi.object().keys({
                email: joi.string().email({ minDomainSegments: 2 }).required(),
                pwd: joi.string().required()
            });
            return joi.validate(data, schema);
        }
    }, {
        key: 'stepOneUserRegistration',
        value: function stepOneUserRegistration(data) {
            var schema = joi.object().keys({
                id: joi.string().required(),
                firstName: joi.string().required(),
                lastName: joi.string().alphanum().required(),
                email: joi.string().email({ minDomainSegments: 2 }).required(),
                pwd: joi.string().required(),
                pin: joi.any(),
                purseNumber: joi.any(),
                tel: joi.any(),
                gender: joi.any(),
                dateOfBirth: joi.any(),
                nationality: joi.any(),
                stateOfOrigin: joi.any(),
                homeAddress: joi.any(),
                localGovernmentOfOrigin: joi.any(),
                cityTownOfOrigin: joi.any(),
                stateOfResidence: joi.any(),
                localGovernmentOfResidence: joi.any(),
                cityTownOfResidence: joi.any(),
                isAdmin: joi.boolean(),
                isAgent: joi.boolean(),
                isOrg: joi.boolean(),
                isDev: joi.boolean(),
                isMember: joi.boolean(),
                country: joi.any(),
                zip: joi.any(),
                passport: joi.any(),
                identification: joi.any(),
                utilityBill: joi.any(),
                timestamp: [joi.string(), joi.number()],
                rating: joi.any(),
                online: joi.any(),
                isVerified: joi.any(),
                verificationStage: joi.any(),
                latitude: joi.any(),
                longitude: joi.any()
            });
            return joi.validate(data, schema);
        }

        // NOT YET FULLY IMPLEMENTED AND TESTED

    }, {
        key: 'stepTwoUserRegistration',
        value: function stepTwoUserRegistration(data) {
            var schema = joi.object().keys({
                id: joi.string().required(),
                firstName: joi.any(),
                lastName: joi.any(),
                email: joi.any(),
                pwd: joi.any(),
                pin: joi.any(),
                purseNumber: joi.number().integer().required(),
                tel: joi.number().integer().required(),
                gender: joi.string().min(4).max(6).required(),
                dateOfBirth: [joi.string(), joi.number()],
                nationality: joi.string().required(),
                stateOfOrigin: joi.string(),
                homeAddress: joi.string(),
                localGovernmentOfOrigin: joi.string(),
                cityTownOfOrigin: joi.string(),
                stateOfResidence: joi.string(),
                localGovernmentOfResidence: joi.string(),
                cityTownOfResidence: joi.string(),
                isAdmin: joi.boolean(),
                isAgent: joi.boolean(),
                isOrg: joi.boolean(),
                isDev: joi.boolean(),
                isMember: joi.boolean(),
                country: joi.string(),
                zip: joi.string(),
                passport: joi.string(),
                identification: joi.string(),
                utilityBill: joi.string(),
                timestamp: [joi.string(), joi.number()],
                rating: joi.number(),
                online: joi.string(),
                isVerified: joi.boolean(),
                verificationStage: joi.number(),
                latitude: joi.string(),
                longitude: joi.string()
            });
            var result = joi.validate(data, schema);

            if (result.error === null) {
                return true;
            }console.log(result.error);
            return false;
        }
    }, {
        key: 'purse',
        value: function purse(data) {
            var schema = joi.object().keys({
                purseNumber: joi.number().integer(),
                balance: joi.number(),
                bonusBalance: joi.number(),
                purseOwner: joi.string()
            });
            return joi.validate(data, schema);
        }
    }, {
        key: 'package',
        value: function _package(data) {
            var schema = joi.object().keys({});
            return joi.validate(data, schema);
        }
    }, {
        key: 'investment',
        value: function investment(data) {
            var schema = joi.object().keys({});
            return joi.validate(data, schema);
        }
    }, {
        key: 'card',
        value: function card(data) {
            var schema = joi.object().keys({});
            return joi.validate(data, schema);
        }
    }]);

    return Validator;
}();

exports.default = Validator;