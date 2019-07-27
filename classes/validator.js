const joi = require('@hapi/joi');



Validator = {

    validateStep1UserRegistration: (data) => {
        const schema = joi.object().keys({
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
            longitude: joi.any(),
        });
        const result = joi.validate(data, schema);
        //  console.log(result.error);
        if (result.error === null) {
            return true;
        }
        return false;

    },
    validateStep2UserRegistration: (data) => {
        const schema = joi.object().keys({
            id: joi.string().required(),
            firstName: joi.string().required(),
            lastName: joi.string().alphanum().required(),
            email: joi.string().email({ minDomainSegments: 2 }).required(),
            pwd: joi.string().required(),
            pin: joi.string().required(),
            purseNumber: joi.number().integer().required(),
            tel: joi.number().integer().min(11).max(11),
            gender: joi.string().min(4).max(6),
            dateOfBirth: [joi.string(), joi.number()],
            nationality: joi.string(),
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
            longitude: joi.string(),
        });
        const result = joi.validate(data, schema);
        console.log(result.error);
        if (result.error === null) {
            return true;
        }
        return false;

    }
}

module.exports = Validator;