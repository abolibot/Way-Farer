import express from 'express';
import validators from '../middlewares/validator';
import schemas from '../helpers/validatorSchema';
import authController from '../controllers/AuthController';

const authRouter = express.Router();
const { validateBody } = validators;
const { signupSchema, signinSchema } = schemas;

authRouter.post('/signup', validateBody(signupSchema), authController.signup);
authRouter.post('/signin', validateBody(signinSchema), authController.signin);

export default authRouter;
