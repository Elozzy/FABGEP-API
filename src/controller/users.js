import jwt from 'jsonwebtoken';
import MDBConnect from '../database/Mongodb';

import Encryptor from '../helper/encryptor';
import uuid from 'uuid/v4';
const jwtKey = "(88200819970317@CyberCop);;;;;;;;;;;";
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
                bonusLock: true,
                purseLock: false,
                purseOwner: userData.uid,
                timestamp: Date.now(),

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
            const getNewData = await MDBConnect.findOne('users', {
                uid: userData.uid
            });
            // generating token to access userData on other routes
            const token = jwt.sign({ uid: userData.uid, pwd: userData.pwd, pin: userData.pin }, jwtKey, { expiresIn: '24h' });

            // delete sensitive information form object
            delete getNewData['pwd'];
            delete getNewData['pin'];

            // return user token
            return response.status(201).json({
                'status': true,
                data: {
                    token, data: getNewData,
                },
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
            const data = await MDBConnect.findOne('users', {
                email: loginData.email
            });
            if (!data) {
                return response.status(401).json({
                    'status': false,
                    'message': `Incorrect email address or password`
                });
            }

            // decrypt and compare password
            const comparePassword = Encryptor.compare(loginData.pwd, data.pwd);
            if (!comparePassword) {
                return response.status(401).json({
                    'status': false,
                    'message': `Incorrect email address or password`
                });
            }

            // generating token to access userData on other routes
            const token = jwt.sign(data, jwtKey)

            // delete sensitive information form object
            delete data['pwd'];
            delete data['pin'];

            // return data Object
            return response.status(200).json({
                'status': true,
                data: { token, data: data },

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
    static async validatePin(request, response) {
        const { pin } = request.body;


        if (!pin) {
            return response.status(400).json({
                status: false,
                message: 'Invalid pin',
                data: false
            })
        }

        if (pin == request.userData.pin) {
            return response.status(200).json({
                status: true,
                message: 'valid',
                'data': true,
            })
        }
        return response.status(400).json({
            status: false,
            message: 'Invalid pin',
            data: false
        })

    }

}

export default Users;