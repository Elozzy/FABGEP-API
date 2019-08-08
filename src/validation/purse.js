import { isNumber } from "util";

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
const isInteger = /^(?:[1-9]\d*|\d)$/;
const isMoney = /^\d{0,6}(\.\d{0,2}){0,1}$/;
const isValidAlphabet = /^[a-zA-Z ]*$/;
const isValidName = /^[a-zA-Z]{3,15}$/;
const isValidPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
const whiteSpace = /\s/g;
const isBoolean = /^(true|false|1|0)$/;
const isValidPhone = /^[0-9]{8,16}$/;
const isAccountNumber = /^[0-9]{10}$/;


export default class PurseValidator {


    static userProfile(request, response, next) {
        const { uid } = request.userData;
        if (Object.keys(request.query).length > 1) {
            return response.status(400).json({
                status: false,
                data: '',
                message: 'Only uid required'
            });
        }
        if (isEmpty(uid)) {
            return response.status(400).json({
                status: false,
                data: '',
                message: 'uid is required'
            })
        }
        next();
    }

    static purse(request, response, next) {
        const { uid } = request.query;

        if (Object.keys(request.query).length > 1) {
            return response.status(400).json({ status: false, message: 'less data required', data: '' });

        }

        if (isEmpty(uid)) {
            return response.status(400).json({ status: false, message: 'empty request', data: '' });
        }
        next();
    }

    static transactions(request, response, next) {
        const { uid } = request.userData;
        const { limit } = request.query;

        if (isEmpty(uid) || isEmpty(limit)) {
            return response.status(400).json({ status: false, message: `uid and limit can't be left empty`, data: '' })
        }

        if (!isNumber.test(limit)) {
            return response.status(400).json({ status: false, message: `limit mush be an integer value`, data: '' });
        }

        next();

    }

    static transfer(request, response, next) {
        const { amount, toAccount, } = request.body;

        if (Object.keys(request.body).length > 2) {
            return response.status(400).json({ status: false, message: 'less data required', data: '' });
        }

        if (isEmpty(amount) || isEmpty(toAccount)) {
            return response.status(400).json({ status: false, message: 'amount and to account is required', data: '' });
        }

        if (!isMoney.test(amount)) {
            return response.status(400).json({ status: false, message: 'amount mush be a double', data: '' });
        }
        if (!isAccountNumber.test(toAccount)) {
            return response.status(400).json({ status: false, message: 'invalid account number', data: '' });
        }

        next();
    }
}