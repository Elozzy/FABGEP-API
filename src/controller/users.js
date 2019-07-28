import jwt from 'jsonwebtoken';
import MDBConnect from '../database/Mongodb';
import { CookieAccessInfo } from 'cookiejar';

class Users {

    static async userSignup(request, response) {
        try {
            const userData = { ...request.body };

            // check if email is already in use by someone else
            MDBConnect.findOne('users', { email: userData.email }, (err, data) => {
                if (err) {
                    response.status(400).json({
                        'status': false, 'message': `error ocurred`, data: ''
                    });
                }

                if (data) {
                    console.log(data);
                    response.status(400).json({
                        'status': false, 'message': `email already in use`, data: ''
                    });
                }

                // get a new account number to be tied to the account
                MDBConnect.findOne('index_account_number', { availability: true, owner: null }, (err, accontNumber) => {
                    console.log(accontNumber);

                })
            });



        } catch (error) {
            return response.status(500).json({
                status: true,
                message: 'error occurred',
                'data': error
            })
        }
    }
    static userLogin(request, response) {

    }
    static userProfile(request, response) {

    }
}

export default Users;