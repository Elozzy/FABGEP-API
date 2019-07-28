import jwt from 'jsonwebtoken';
import MDBConnect from '../database/Mongodb';
import { CookieAccessInfo } from 'cookiejar';
import Encryptor from '../helper/encryptor';

class Users {

    static async userSignup(request, response) {
        try {
            const {...userData } = request.body;
            // check if email is already in use by someone else
           const checkEmail = await MDBConnect.findOne('users', { email: userData.email });
                if (checkEmail !=null) {
                   return response.status(409).json({
                        'status': false, 'message': `email already in use`
                    });
                }
                // encrypted password to store in db
                const encryptedPassword = Encryptor.encrypt(userData.pwd);
                // Data to be store in db
                const data ={ ...userData, pwd: encryptedPassword };
                // storing data into the database
                const result = await MDBConnect.insert('users', data);
                // token payload data
                const { pwd, ...payload} = result.ops[0];
                // generating token to access userData on other routes
                const token = jwt.sign(payload, 'foodmoni')
                // return data Object
                return response.status(201).json({
                    'status': true, data:payload, token, 'message': `Registeration was successful`,
                });

                // REFACTOR THE CODE, AVOID USING CALLBACK, SINCE IT AN ASYNC MENTHOD USE THE CATCH TO SEND THE ERROR, WHILE THE FUNCTION RETURN THE RESPONSE

                // get a new account number to be tied to the account
                // MDBConnect.findOne('index_account_number', { availability: true, owner: null }, (err, accontNumber) => {
                //     console.log(accontNumber);

                // })

        } catch (error) {
            return response.status(500).json({
                status: false,
                message: 'error occurred',
                'data': error
            })
        }
    }
    static async userLogin(request, response) {
        try{
            const loginData = { ...request.body};
            // check email
            const checkEmail = await MDBConnect.findOne('users', { email: loginData.email });
                if (!checkEmail) {
                   return response.status(409).json({
                        'status': false, 'message': `Incorrect email address or password`
                    });
                }
            // decrypt and compare password
            const comparePassword = Encryptor.compare(loginData.pwd, checkEmail.pwd);
            if(!comparePassword){
                return response.status(409).json({
                    'status': false, 'message': `Incorrect email address or password`
                });
            }
            const { pwd, ...payload} = checkEmail;
            // generating token to access userData on other routes
            const token = jwt.sign(payload, 'foodmoni')
            // return data Object
            return response.status(200).json({
                'status': true, data:payload, token, 'message': `Login was successful`,
            });

        } catch (error){
            return response.status(500).json({
                status: false,
                message: 'error occurred',
                'data': error
            })
        }

    }
    static userProfile(request, response) {

    }
}

export default Users;