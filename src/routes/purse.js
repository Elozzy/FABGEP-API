import { Router } from 'express';
import Controller from '../controller/purse';
import Validator from '../validation/purse';

const router = Router();


router.get('/purse', Validator.purse, Controller.purse);



export default router;