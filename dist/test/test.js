'use strict';

var assert = require('chai').assert;
var validator = require('../classes/validator');

describe('test validation process of a user in step 1 of registration', function () {
    if ('validation should pass if the right information are supplied', function () {
        var payload = {
            id: 'eKSBJBSCaLblaLJLKDBClJl',
            firstName: 'John',
            lastName: 'Peter',
            email: 'johnpeter@gmail.com',
            pwd: 'Password@1',
            pin: '',
            purseNumber: 8123456789,
            tel: '',
            gender: '',
            dateOfBirth: '',
            nationality: '',
            stateOfOrigin: '',
            homeAddress: '',
            localGovernmentOfOrigin: '',
            cityTownOfOrigin: '',
            stateOfResidence: '',
            localGovernmentOfResidence: '',
            cityTownOfResidence: '',
            isAdmin: false,
            isAgent: false,
            isOrg: false,
            isDev: false,
            isMember: true,
            country: '',
            zip: '',
            passport: '',
            identification: '',
            utilityBill: '',
            timestamp: Date.now(),
            rating: 0.0,
            online: '',
            isVerified: false,
            verificationStage: 0,
            latitude: '',
            longitude: ''

        };
        assert.equal(validator.validateStep1UserRegistration(payload), null);
    }) ;
});