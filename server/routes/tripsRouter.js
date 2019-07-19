import express from 'express';
import validators from '../middlewares/validator';
import schemas from '../helpers/validatorSchema';
import tripsController from '../controllers/Trips';
import getToken from '../middlewares/getToken';
import authenticateUser from '../middlewares/authenticateUser';

const tripsRouter = express.Router();
const { validateBody } = validators;
const { getAllTrips } = schemas;

tripsRouter.get('/', validateBody(getAllTrips), getToken, authenticateUser, tripsController);

export default tripsRouter;
