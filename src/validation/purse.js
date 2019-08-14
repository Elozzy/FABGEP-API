import { isNumber, isString } from "util";

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
        const { amount, toAccount, pin, purpose } = request.body;

        if (Object.keys(request.body).length < 4) {
            return response.status(400).json({ status: false, message: 'more data required', data: '' });
        }

        if (isEmpty(amount) || isEmpty(toAccount) || isEmpty(pin) || isEmpty(purpose)) {
            return response.status(400).json({ status: false, message: 'amount,pin, purpose and to account is required', data: '' });
        }

        if (Number(amount) < 0) {
            return response.status(400).json({ status: false, message: 'amount is invalid', data: '' });
        }

        if (!isMoney.test(amount)) {
            return response.status(400).json({ status: false, message: 'amount mush be a double', data: '' });
        }
        if (!isAccountNumber.test(toAccount)) {
            return response.status(400).json({ status: false, message: 'invalid account number', data: '' });
        }

        const amt = Number(amount);

        if (amt < 1) {
            return response.status(400).json({ status: false, message: 'invalid amount', data: '' });
        }

        // parse amount to valid number
        request.body.amount = Number(amount);
        console.log(request.body);

        next();
    }

    static exchangeRate(request, response, next) {
        const { pair } = request.query;

        if (Object.keys(request.query).length > 1) {
            return response.status(400).json({ status: false, message: 'less data required', data: '' });
        }

        if (isEmpty(pair)) {
            return response.status(400).json({ status: false, message: ` pair is required`, data: '' });
        }

        next();

    }

    static deposit(request, response, next) {
        const { ref,
            type,
            from,
            to,
            fromAccountName,
            toAccountName,
            uid,
            amount,
            currency,
            status,
            method,
            title,
            desc, timestamp,
        } = request.body;

        if (Object.keys(request.body).length < 15) {
            return response.status(400).json({ status: false, message: 'more data required', data: '' });
        }

        if (isEmpty(amount) || isEmpty(ref) || isEmpty(type) || isEmpty(from) || isEmpty(to) || isEmpty(uid) || isEmpty(currency) || isEmpty(fromAccountName) || isEmpty(toAccountName) || isEmpty(status) || isEmpty(method) || isEmpty(title) || isEmpty(desc) || isEmpty(timestamp)) {
            return response.status(400).json({ status: false, message: `ref, type, from, to, fromAccountName, toAccountName, uid, amount,  currency, status, method, title, desc and timestamp is required`, data: '' });
        }

        if (Number(amount) < 0) {
            return response.status(400).json({ status: false, message: 'amount is invalid', data: '' });
        }

        if (!isMoney.test(amount)) {
            return response.status(400).json({ status: false, message: 'amount mush be a double', data: '' });
        }

        const amt = Number(amount);

        if (amt < 1) {
            return response.status(400).json({ status: false, message: 'invalid amount', data: '' });
        }

        // parse amount to valid number
        request.body.amount = Number(amount);
        console.log(request.body);

        next();
    }

}