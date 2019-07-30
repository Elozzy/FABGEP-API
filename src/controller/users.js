import jwt from 'jsonwebtoken';
import MDBConnect from '../database/Mongodb';

import Encryptor from '../helper/encryptor';
import uuid from 'uuid/v4';
const jwtKey = "(88200819970317@CyberCop)";
class Users {

    static async  generateNumber() {
        const random = Date.now().toString();
        const sub = random.substr(6, random.length)

        const salt = Math.floor(100 + Math.random() * 900);
        const num = Number(`${salt}${sub}`);
        let checkIfGeneratedPurseNumberIsValid = await MDBConnect.findOne('purse', { number: num });
        if (checkIfGeneratedPurseNumberIsValid != null) {
            console.log(`getting new Number => Previous ${num}`);
            return Users.generateNumber();
        } else {
            return num;
        }

    };

    static async userSignup(request, response) {
        try {
            const { ...userData } = request.body;

            // set user unique identification number
            userData.uid = uuid();
            // set timestamp
            userData.timestamp = Date.now();

            // check if email is already in use by someone else
            const checkEmail = await MDBConnect.findOne('users', {
                email: userData.email
            });
            if (checkEmail != null) {
                return response.status(409).json({
                    'status': false,
                    'message': `email already in use`
                });
            }

            // encrypted user password  
            const encryptedPassword = Encryptor.encrypt(userData.pwd);
            userData.pwd = encryptedPassword;


            // generate a purse number 
            const purseNumber = await Users.generateNumber();
            // link purse number to user account
            userData.purseNumber = purseNumber;
            const purse = {
                number: purseNumber,
                balance: 0.0,
                bonusBalance: 0.0,
                purseOwner: userData.uid,
                createTimestamp: Date.now(),
                lastUpdateTimestamp: Date.now()
            }

            // storing user account into the database
            const createUserAccount = await MDBConnect.insertOne('users', userData);
            if (!createUserAccount) {
                console.log(`error occurred creating user account ${userData}`);
                return response.status(500).json({
                    status: false,
                    message: 'error occurred setting up account',
                    'data': ''
                })
            }

            // store user purse account to database
            const createPurseAccount = await MDBConnect.insertOne('account', purse);
            if (!createPurseAccount) {
                console.log(`error occurred creating pure account ${createPurseAccount}`);
                return response.status(500).json({
                    status: false,
                    message: 'error occurred setting up account',
                    'data': ''
                })
            }

            // generating token to access userData on other routes
            const token = jwt.sign({ uid: userData.uid, pwd: userData.pwd }, jwtKey);
            // return user token
            return response.status(201).json({
                'status': true,
                data: token,
                'message': `success`,
            });


        } catch (error) {
            return response.status(500).json({
                status: false,
                message: 'error occurred',
                'data': error
            })
        }
    }
    static async userLogin(request, response) {
        try {
            const loginData = {
                ...request.body
            };
            // check email
            const checkEmail = await MDBConnect.findOne('users', {
                email: loginData.email
            });
            if (!checkEmail) {
                return response.status(401).json({
                    'status': false,
                    'message': `Incorrect email address or password`
                });
            }

            // decrypt and compare password
            const comparePassword = Encryptor.compare(loginData.pwd, checkEmail.pwd);
            if (!comparePassword) {
                return response.status(401).json({
                    'status': false,
                    'message': `Incorrect email address or password`
                });
            }

            // generating token to access userData on other routes
            const token = jwt.sign(checkEmail, jwtKey)
            // return data Object
            return response.status(200).json({
                'status': true,
                data: { token, data: checkEmail },

                'message': `Login was successful`,
            });

        } catch (error) {
            return response.status(500).json({
                status: false,
                message: 'error occurred',
                'data': error
            })
        }

    }
    static async userProfile(request, response) {
        try {
            const { uid } = request.query;
            const data = await MDBConnect.findOne('users', { uid });
            if (!data) {
                return response.status(404).json({
                    status: false,
                    message: 'no document found',
                    'data': data
                })
            }
            return response.status(200).json({
                'status': true,
                data,

                'message': `document found`,
            });
        } catch (error) {
            return response.status(500).json({
                status: false,
                message: 'error occurred',
                'data': error
            })
        }
    }
}

export default Users;