import jwt from 'jsonwebtoken';
import MDBConnect from '../database/Mongodb';
const jwtKey = "(88200819970317@CyberCop);;;;;;;;;;;";

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
const isMoney = /^\d{0,6}(\.\d{0,2}){0,1}$/;
const isValidAlphabet = /^[a-zA-Z ]*$/;
const isValidName = /^[a-zA-Z]{3,15}$/;
const isValidPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
const whiteSpace = /\s/g;
const isBoolean = /^(true|false|1|0)$/;
const isValidPhone = /^[0-9]{8,16}$/;



export default class Authentication {



    static async isAuthenticated(request, response, next) {
        try {
            const { authorization } = request.headers;
            if (isEmpty(authorization)) {
                return response.status(401).json({ status: false, message: `Authentication required`, data: '' });
            }
            const userCredentials = jwt.verify(authorization, jwtKey);
            if (!userCredentials) {
                return response.status(401).json({ status: false, message: `Authentication required`, data: '' });
            }
            const user = await MDBConnect.findOne('users', { uid: userCredentials.uid, pwd: userCredentials.pwd });
            if (!user) {
                return response.status(401).json({ status: false, message: `Authentication required`, data: '' });
            }
            request.userData = user;

            next();

        } catch (error) {
            return response.status(401).json({ status: false, message: `Authentication required`, data: '' });
        }
    }

    static async tokenAuthentication(request, response, next) {
        try {
            const { authorization } = request.headers;
            if (isEmpty(authorization)) {
                return response.status(401).json({ status: false, message: `Authentication required`, data: '' });
            }
            const userCredentials = jwt.verify(authorization, jwtKey);
            if (!userCredentials) {
                return response.status(401).json({ status: false, message: `Authentication required`, data: '' });
            }
            const user = await MDBConnect.findOne('users', { uid: userCredentials.uid, pwd: userCredentials.pwd });
            if (!user) {
                return response.status(401).json({ status: false, message: `Authentication required`, data: '' });
            }

            // delete sensitive information form object
            delete user['pwd'];
            delete user['pin'];

            return response.status(200).json({ status: true, message: `valid`, data: user });


        } catch (error) {
            return response.status(401).json({ status: false, message: `Authentication required`, data: '' });
        }
    }

}