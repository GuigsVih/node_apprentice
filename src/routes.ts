import { Router } from 'express';

//controllers
import AuthController from './app/controllers/Auth/AuthController'; 
import UserController from './app/controllers/User/UserController';

const router = Router();

router.post('/register', UserController.store);
router.post('/auth/login', AuthController.authenticate);

export default router;