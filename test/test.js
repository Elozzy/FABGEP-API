const assert = require('chai').assert;
const validator = require('../classes/validator');
var payload = {
    id: 'eKSBJBSCaLblaLJLKDBClJl',
    firstName: 'John',
    lastName: 'Peter',
    email: 'johnpeter@gmail.com',
    pwd: 'Password@1',
    pin: null,
    purseNumber: 1234567890,
    tel: 0,
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
    longitude: '',

};





describe('test validation process of a user in step 1 of registration', () => {





    it('validation should pass if the right information are supplied', () => {

        assert.equal(validator.validateStep1UserRegistration(payload), true);
    });





    it('validation should fail if the wrong information are supplied', () => {
        // delete payload['email'];
        payload.id = null;
        assert.equal(validator.validateStep1UserRegistration(payload), false);
    });
});