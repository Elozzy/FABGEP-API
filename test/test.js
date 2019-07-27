const assert = require('chai').assert;
const validator = require('../classes/validator');




describe('validation process for user authentication', () => {


    let payload = {
        email: 'abc@gmail.com',
        pwd: '123oihofihwonwi',
    };

    it('should pass if the right information are supplied', () => {

        assert.equal(validator.login(payload), true);
    });

});




describe('validation process registration', () => {

    it("should pass if the right information are supplied", () => {


        assert.equal(validator.stepOneUserRegistration({
            id: "eKSBJBSCaLblaLJLKDBClJl",
            firstName: "John",
            lastName: "Peter",
            email: "johnpeter@gmail.com",
            pwd: "Password@1",
            pin: null,
            purseNumber: 1234567890,
            tel: 0,
            gender: "",
            dateOfBirth: "",
            nationality: "",
            stateOfOrigin: "",
            homeAddress: "",
            localGovernmentOfOrigin: "",
            cityTownOfOrigin: "",
            stateOfResidence: "",
            localGovernmentOfResidence: "",
            cityTownOfResidence: "",
            isAdmin: false,
            isAgent: false,
            isOrg: false,
            isDev: false,
            isMember: true,
            country: "",
            zip: "",
            passport: "",
            identification: "",
            utilityBill: "",
            timestamp: Date.now(),
            rating: 0.0,
            online: "",
            isVerified: false,
            verificationStage: 0,
            latitude: "",
            longitude: "",

        }), true);
    });

});



describe('validate registration process', () => {
    it('should fail if the wrong information are supplied', () => {

        assert.equal(validator.stepOneUserRegistration({
            id: null,
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

        }), false);
    });
})