/**
 * @description isEmpty check for empty input field
 * @return { boolean }
 */

const isEmpty = value => {
    return (
        value === undefined ||
        value === null ||
        (typeof value === 'object' && Object.keys(value).length === 0) ||
        (typeof value === 'string' && value.trim().length === 0)
    );
};
const isValidEmail = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,10})$/;
const isIntegar = /^(?:[1-9]\d*|\d)$/;
const isValidAlphabet = /^[a-zA-Z ]*$/;
const isValidName = /^[a-zA-Z]{3,15}$/;
const isValidPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
const whiteSpace = /\s/g;
const isBoolean = /^(true|false|1|0)$/;
const isValidPhone = /^[0-9]{8,16}$/;

class UserValidation {
    static userSignup(request, response, next) {
        /**
         * @description Validate user signup details 
         * @param { Object } request contains the user details
         * @param { Object } response contains response sent to the user
         * @return { json }
        */
        console.log(request.body);
        const {
            firstName,
            lastName,
            email,
            pwd,
        } = request.body;
        console.log(Object.keys(request.body).length)
        if (Object.keys(request.body).length != 5) {
            return response.status(400).json({
                status: true,
                data: '',
                message: 'Only First Name, Last Name, Middle name Email and Password is required'
            });
        }
        if (isEmpty(firstName) && isEmpty(lastName) && isEmpty(email) && isEmpty(pwd) && isEmpty(phone)) {
            return response.status(400).json({
                status: true,
                data: '',
                message: 'First Name, Last Name, Email, Password and Phone number field are required'
            });
        }
        if (isEmpty(firstName)) {
            return response.status(400).json({
                status: true,
                data: '',
                message: 'First name is required'
            })
        }
        if (!isValidAlphabet.test(firstName)) {
            return response.status(422).json({
                status: false,
                data: '',
                message: 'First name can only contain alphabets'
            })
        }
        if (!isValidName.test(firstName)) {
            return response.status(422).json({
                status: false,
                data: '',
                message: 'First name should not contain spaces and be less than 3 or more than 15'
            })
        }
        if (isEmpty(lastName)) {
            return response.status(400).json({
                status: true,
                data: '',
                message: 'Last name is required'
            })
        }
        if (!isValidAlphabet.test(lastName)) {
            return response.status(422).json({
                status: false,
                data: '',
                message: 'Last name can only contain alphabets'
            })
        }
        if (!isValidName.test(lastName)) {
            return response.status(422).json({
                status: false,
                data: '',
                message: 'Last name should not contain spaces be less than 3 or greater than 15'
            })
        }
        if (isEmpty(pwd)) {
            return response.status(400).json({
                status: true,
                data: '',
                message: 'Password is required'
            })
        }
        if (!isValidPassword.test(pwd)) {
            return response.status(422).json({
                status: false,
                data: '',
                message: 'Password should contain minimum eight characters, at least one letter and one number:'
            })
        }
        if (isEmpty(email)) {
            return response.status(400).json({
                status: true,
                data: '',
                message: 'Email is required'
            })
        }
        if (!isValidEmail.test(email)) {
            return response.status(422).json({
                status: false,
                data: '',
                message: 'Invalid email address'
            })
        }
        // if(isEmpty(phone)){
        //     return response.status(400).json({
        //         status: true,data: '',
        //         message: 'Phone number is required'
        //     })
        // }
        // if(!isValidPhone.test(phone)){
        //     return response.status(422).json({
        //         status: false,data:'',
        //         message: 'Invalid phone number, phone number should not be less than 8 and more than 16'
        //     })
        // }
        // if(!isBoolean.test(isAdmin)){
        //     return response.status(422).json({
        //         status: false,data:'',
        //         message: 'Invalid input, isAdmin can only be true or false'
        //     })
        // }
        next();

    }
    static userLogin(request, response, next) {

        const {
            email,
            pwd
        } = request.body;
        if (Object.keys(request.body).length > 2) {
            return response.status(400).json({
                status: true,
                data: '',
                message: 'Only Email and Password is required'
            });
        }
        if (isEmpty(email)) {
            return response.status(400).json({
                status: true,
                data: '',
                message: 'Email is required'
            })
        }
        if (!isValidEmail.test(email)) {
            return response.status(422).json({
                status: false,
                data: '',
                message: 'Invalid email address'
            })
        }
        if (isEmpty(pwd)) {
            return response.status(400).json({
                status: true,
                data: '',
                message: 'Password is required'
            })
        }
        if (!isValidPassword.test(pwd)) {
            return response.status(422).json({
                status: false,
                data: '',
                message: 'Password should contain minimum eight characters, at least one letter and one number:'
            })
        }
        next();
    }
    static userProfile(request, response, next) {
        const { uid } = request.query;
        if (Object.keys(request.query).length > 1) {
            return response.status(400).json({
                status: true,
                data: '',
                message: 'Only uid required'
            });
        }
        if (isEmpty(uid)) {
            return response.status(400).json({
                status: true,
                data: '',
                message: 'uid is required'
            })
        }
        next();
    }
}

module.exports = UserValidation;