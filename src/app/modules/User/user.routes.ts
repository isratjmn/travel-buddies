import express from 'express';
import { UserControllers } from './user.controller';
import requestvalidate from '../../middlewares/requstValidate';
import { UserValidation } from './user.validation';

const router = express.Router();

router.post('/',
    requestvalidate(UserValidation.CreateUserSchema),
    UserControllers.createUser);

export const userRoutes = router;