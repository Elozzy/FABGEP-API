import { Router } from 'express';
import Controller from '../controller/users';
import Validation from '../validation/Users';

const router = Router();

router.post('/signup', Validation.userSignup, Controller.userSignup ); 
router.post('/login', Validation.userLogin, Controller.userLogin);
export default router;
