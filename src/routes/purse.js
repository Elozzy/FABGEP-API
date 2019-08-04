import { Router } from 'express';
import Controller from '../controller/purse';
import Validator from '../validation/purse';

const router = Router();


router.get('/purse', Validator.purse, Controller.purse);
router.post('/transactions', Validator.transactions, Controller.transactions);


export default router;
