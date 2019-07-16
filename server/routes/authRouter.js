import express from 'express';
import validators from '../middlewares/validator';
import schemas from '../helpers/validatorSchema';
import checkIfEmailExist from '../middlewares/checkIfEmailExist';
import signupController from '../controllers/Signup';
import signinController from '../controllers/Signin';

const authRouter = express.Router();
const { validateBody } = validators;
const { signupSchema, signinSchema } = schemas;

authRouter.post('/signup', validateBody(signupSchema), checkIfEmailExist, signupController);
authRouter.post('/signin', validateBody(signinSchema), signinController);

export default authRouter;
