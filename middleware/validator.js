import Validator from '../classes/validator';


class Validation {


    static createAccount(req, res, next) {
        const result = Validator.stepOneUserRegistration(req.body);
        if (result.error) {
            return res.status(404).json({ status: 404, error: result.error.details[0].message });
        }
        return next();
    }

    static login(req, res, next) {
        const result = Validator.login(req.body);
        if (result.error) {
            return res.status(404).json({ status: 404, error: result.error.details[0].message });
        }
        return next();
    }

}

module.export =  Validation;