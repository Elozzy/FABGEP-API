import { Router } from 'express';
import Controller from '../controller/purse';
import Validator from '../validation/purse';

const router = Router();

router.get('/user', Validator.userProfile, Controller.userProfile);
router.get('/purse', Validator.purse, Controller.purse);
router.post('/transactions', Validator.transactions, Controller.transactions);
router.post('/transfer', Validator.transfer, Controller.transfer);
// router.post('/deposit', Validator.deposit, Controller.deposit);


export default router;
