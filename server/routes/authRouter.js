import express from 'express';
import validators from '../middlewares/validator';
import schemas from '../helpers/validatorSchema';
import signupController from '../controllers/Signup';

const authRouter = express.Router();
const { validateBody } = validators;
const { signupSchema } = schemas;

authRouter.post('/signup', validateBody(signupSchema), signupController);

export default authRouter;
