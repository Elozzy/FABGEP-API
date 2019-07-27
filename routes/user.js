const express = require('express');
import userController from '../controller/user';
import validator from '../validation/Users';


const router = express.Router();


router.post('/api/v1/createAccount', validator.userSignup, userController.createAccount);

router.post('/api/v1/login', validator.login, userController.login);

router.get('/api/v1/hello', (req, res) => {
    console.log('Hey!');
    res.send("great");
});

module.exports = router;