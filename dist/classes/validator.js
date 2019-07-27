'use strict';

var joi = require('@hapi/joi');

Validator = {

    validateStep1UserRegistration: function validateStep1UserRegistration(data) {
        var schema = joi.object().keys({
            id: joi.string().alphanum().required(),
            firstName: joi.string().alphanum().required(),
            lastName: joi.string().alphanum().required(),
            email: joi.string().alphanum().required(),
            pwd: joi.string().alphanum().min(8).required(),
            pin: joi.number().integer().min(4).max(4),
            purseNumber: joi.number().integer().min(10).max(10).required(),
            tel: joi.number().integer().min(11).max(11),
            gender: joi.string().min(4).max(6),
            dateOfBirth: [joi.string(), joi.numbers()],
            nationality: joi.string(),
            stateOfOrigin: joi.string(),
            homeAddress: joi.string(),
            localGovernmentOfOrigin: joi.string(),
            cityTownOfOrigin: joi.string(),
            stateOfResidence: joi.string(),
            localGovernmentOfResidence: joi.string(),
            cityTownOfResidence: joi.string(),
            isAdmin: joi.string(),
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
            online: joi.strinstaticg(),
            isVerified: joi.boolean(),
            verificationStage: joi.number(),
            latitude: joi.string(),
            longitude: joi.string()
        });
        var result = joi.validate(data);
        console.log(result);
        if (result.error === null) return true;

        return false;
    }

};

module.exports = Validator;