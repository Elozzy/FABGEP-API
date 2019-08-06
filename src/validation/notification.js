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
const isValidAlphabet = /^[a-zA-Z ]*$/;
const isValidName = /^[a-zA-Z]{3,15}$/;
const isValidPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
const whiteSpace = /\s/g;
const isBoolean = /^(true|false|1|0)$/;
const isValidPhone = /^[0-9]{8,16}$/;


export default class Notification {


    static notification(request, response, next) {
        const { id, title, desc, uid, type, seen, timestamp } = request.body;

        if (Object.keys(request.body).length > 7) {
            return response.status(400).json({
                status: false,
                data: '',
                message: 'Only  title, desc, type, seen, timestamp, id and _id that is required'
            });
        }

        if (isEmpty(id)) {
            return response.status(400).json({
                status: false,
                data: '',
                message: `id can't be left empty`
            });
        }
        if (isEmpty(uid)) {
            return response.status(400).json({
                status: false,
                data: '',
                message: `uid can't be left empty`
            });
        }
        if (isEmpty(title)) {
            return response.status(400).json({
                status: false,
                data: '',
                message: `title can't be left empty`
            });
        }
        if (isEmpty(desc)) {
            return response.status(400).json({
                status: false,
                data: '',
                message: `desc can't be left empty`
            });
        }
        if (isEmpty(type)) {
            return response.status(400).json({
                status: false,
                data: '',
                message: `type can't be left empty`
            });
        }
        if (isEmpty(seen)) {
            return response.status(400).json({
                status: false,
                data: '',
                message: `seen can't be left empty`
            });
        }
        if (isEmpty(timestamp)) {
            return response.status(400).json({
                status: false,
                data: '',
                message: `timestamp can't be left empty`
            });
        }


        if (!isBoolean.test(seen)) {
            return response.status(400).json({
                status: false,
                data: '',
                message: `seen is not a valid data type of boolean`
            });
        }
        next();
    }

    static notifications(request, response, next) {
        const { query, limit } = request.body;

        if (Object.keys(request.body).length > 2) {
            return response.status(400).json({
                status: false,
                data: '',
                message: 'Only  title, desc, type, seen, timestamp, id and _id that is required'
            });
        }

        if (isEmpty(query)) {
            return response.status(400).json({
                status: false,
                data: '',
                message: `query can't be left empty`
            });
        }
        if (isEmpty(limit)) {
            return response.status(400).json({
                status: false,
                data: '',
                message: `limit can't be left empty`
            });
        }



        if (!isInteger.test(limit)) {
            return response.status(400).json({
                status: false,
                data: '',
                message: `limit is not a valid data type of integer`
            });
        }
        next();
    }
}