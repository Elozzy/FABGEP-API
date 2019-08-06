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
const isIntegar = /^(?:[1-9]\d*|\d)$/;
const isValidAlphabet = /^[a-zA-Z ]*$/;
const isValidName = /^[a-zA-Z]{3,15}$/;
const isValidPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
const whiteSpace = /\s/g;
const isBoolean = /^(true|false|1|0)$/;
const isValidPhone = /^[0-9]{8,16}$/;


export default class PurseValidator {



    static purse(request, response, next) {
        const { uid } = request.query;

        if (Object.keys(request.query).length > 1) {
            response.status(400).json({ status: false, message: 'less data required', data: '' });

        }

        if (isEmpty(uid)) {
            response.status(400).json({ status: false, message: 'empty request', data: '' });
        }
        next();
    }

    static transactions(request, response, next) {
        const { uid } = request.body;

        if (Object.keys(request.body).length > 2) {
            response.status(400).json({ status: false, message: 'uid and limit is required', data: '' })
        }

        if (isEmpty(uid) || isEmpty(limit)) {
            response.status(400).json({ status: false, message: `uid and limit can't be left empty`, data: '' })
        }

        if (isNumber(limit)) {
            response.status(400).json({ status: false, message: `limit mush be an integer value`, data: '' });
        }

        next();

    }

}