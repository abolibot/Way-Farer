/* eslint-disable max-len */
import Joi from '@hapi/joi';
import { getNextSevenDays } from './getDates';

const schemas = {
  signupSchema: Joi.object().keys({
    email: Joi.string().email().required(),
    firstName: Joi.string().regex(/^([a-zA-Z]{2,30}[-]{0,1}[a-zA-Z]{2,30})$/).max(20).required(),
    lastName: Joi.string().regex(/^([a-zA-Z]{2,30}[-]{0,1}[a-zA-Z]{2,30})$/).max(20).required(),
    password: Joi.string().min(6).required(),
  }),
  signinSchema: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  }),
  getAllTrips: Joi.object().keys({
    user_id: Joi.number().integer().min(1).required(),
    is_admin: Joi.boolean().required(),
  }),
  createTrip: Joi.object().keys({
    user_id: Joi.number().integer().min(1).required(),
    is_admin: Joi.boolean().required(),
    bus_id: Joi.number().integer().min(1).required(),
    origin: Joi.string().regex(/^([a-zA-Z0-9]{2,30}[- ]{0,1}[a-zA-Z0-9]{2,30})$/).max(20).required(),
    destination: Joi.string().regex(/^([a-zA-Z0-9]{2,30}[- ]{0,1}[a-zA-Z0-9]{2,30})$/).max(20).required(),
    trip_date: Joi.date().min('now').max(getNextSevenDays()).iso().required(), // eslint-disable-line newline-per-chained-call
    fare: Joi.number().integer().min(1000).max(15000).required(), // eslint-disable-line newline-per-chained-call
  }),
};

export default schemas;
