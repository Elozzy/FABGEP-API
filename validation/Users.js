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
const isIntegar= /^(?:[1-9]\d*|\d)$/; 
const isValidAlphabet= /^[a-zA-Z ]*$/;
const isValidName = /^[a-zA-Z]{3,15}$/;
const isValidPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
const whiteSpace =/\s/g;
const isBoolean = /^(true|false|1|0)$/;

class UserValidation{
    static userSignup(request, response, next){
         /**
         * @description Valdiate user signup details 
         * @param { Object } request contains the user details
         * @param { Object } response contains response sent to the user
         * @return { json }
         */
        const { first_name, last_name, email, password, is_admin} = request.body;
        if (Object.keys(request.body).length >5) {
            return response.status(400).json({
              status: 400,
              error: 'Only First Name, Last Name, Email and Password is required'
            });
        }
        if (isEmpty(first_name) && isEmpty(last_name) && isEmpty(email) && isEmpty(password)) {
            return response.status(400).json({
              status: 400,
              error: 'First Name, Last Name, Email and Password field are required'
            });
        }
        if(isEmpty(first_name)){
            return response.status(400).json({
                status: 400,
                error: 'First name is required'
            })
        }
        if(!isValidAlphabet.test(first_name)){
            return response.status(422).json({
                status: 422,
                error: 'First name can only contain alphabets'
            })
        }
        if(!isValidName.test(first_name)){
            return response.status(422).json({
                status: 422,
                error: 'First name should not contain spaces and be less than 3 or more than 15'
            })
        }
        if(isEmpty(last_name)){
            return response.status(400).json({
                status: 400,
                error: 'Last name is required'
            })
        }
        if(!isValidAlphabet.test(last_name)){
            return response.status(422).json({
                status: 422,
                error: 'Last name can only contain alphabets'
            })
        }
        if(!isValidName.test(last_name)){
            return response.status(422).json({
                status: 422,
                error: 'Last name should not contain spaces be less than 3 or greater than 15'
            })
        }
        if(isEmpty(password)){
            return response.status(400).json({
                status: 400,
                error: 'Password is required'
            })
        }
        if(!isValidPassword.test(password)){
            return response.status(422).json({
                status: 422,
                error: 'Password should contain m`inimum eight characters, at least one letter and one number:'
            })
        }
        if(isEmpty(email)){
            return response.status(400).json({
                status: 400,
                error: 'Email is required'
            })
        }
        if(!isValidEmail.test(email)){
            return response.status(422).json({
                status: 422,
                error: 'Invalid email address'
            })
        }
        if(!isBoolean.test(is_admin)){
            return response.status(422).json({
                status: 422,
                error: 'Invalid input, is_admin can only be true or false'
            })
        }
        next();

    }
    static userLogin(request, response, next){

    }
    static userProfile(request, response, next){
        
    }
}

export default UserValidation;