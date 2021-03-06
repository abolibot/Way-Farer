import express from 'express';
import validators from '../middlewares/validator';
import schemas from '../helpers/validatorSchema';
import tripsController from '../controllers/Trips';
import authentication from '../middlewares/authentication';

const tripsRouter = express.Router();
const { validateBody } = validators;
const { getAllTrips, createTrip } = schemas;

tripsRouter.get('/', validateBody(getAllTrips), authentication.getToken, authentication.verifyToken, tripsController.getAllTrips);

tripsRouter.post('/', validateBody(createTrip), authentication.getToken, authentication.verifyToken, authentication.isUserAdmin, tripsController.createTrip);

export default tripsRouter;
