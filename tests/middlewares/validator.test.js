/* eslint-env node, mocha */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
import chai from 'chai';
import sinon from 'sinon';
import Joi from '@hapi/joi';

import signupData from '../../server/helpers/testData/signup';
import signinData from '../../server/helpers/testData/signin';
import tripsData from '../../server/helpers/testData/trips';
import validators from '../../server/middlewares/validator';
import schemas from '../../server/helpers/validatorSchema';
import { getToday, getNextSevenDays } from '../../server/helpers/getDates';
import utils from '../utils';

chai.should();
const { res } = utils;
const { validateBody } = validators;
const {
  signupSchema,
  signinSchema,
  getAllTrips,
  createTrip,
} = schemas;

describe('Validator', function () {
  const mockRequest = (userData) => {
    const req = {
      body: userData,
    };
    return req;
  };
  const next = sinon.stub();
  beforeEach(function () {
    sinon.stub(res, 'status').returns(res);
    sinon.stub(res, 'json').returns(res);
  });
  afterEach(function () {
    utils.res.status.restore();
    utils.res.json.restore();
    next.reset();
  });

  describe('Signup Schema', function () {
    it('should return \'email field is required\' message when email is omitted in request', function () {
      const req = mockRequest(signupData.scenarios.withoutEmail);
      const { error } = Joi.validate(req.body, signupSchema);
      validateBody(signupSchema)(req, res, next);
      res.status.calledWith(400).should.equal(true);
      res.json.calledWith({
        status: 400,
        error: error.details[0].message,
      }).should.equal(true);
      next.called.should.equal(false);
    });
    it('should return \'email is not valid\' message when req.email is not a valid email', function () {
      const req = mockRequest(signupData.scenarios.withInvalidEmail);
      const { error } = Joi.validate(req.body, signupSchema);
      validateBody(signupSchema)(req, res, next);
      res.status.calledWith(400).should.equal(true);
      res.json.calledWith({
        status: 400,
        error: error.details[0].message,
      }).should.equal(true);
      next.called.should.equal(false);
    });
    it('should return \'password field is required\' message when password is omitted in request', function () {
      const req = mockRequest(signupData.scenarios.withoutPassword);
      const { error } = Joi.validate(req.body, signupSchema);
      validateBody(signupSchema)(req, res, next);
      res.status.calledWith(400).should.equal(true);
      res.json.calledWith({
        status: 400,
        error: error.details[0].message,
      }).should.equal(true);
      next.called.should.equal(false);
    });
    it('should return \'password is not valid\' message when req.password is not a valid password', function () {
      const req = mockRequest(signupData.scenarios.withInvalidPassword);
      const { error } = Joi.validate(req.body, signupSchema);
      validateBody(signupSchema)(req, res, next);
      res.status.calledWith(400).should.equal(true);
      res.json.calledWith({
        status: 400,
        error: error.details[0].message,
      }).should.equal(true);
      next.called.should.equal(false);
    });
    it('should return \'first_name field is required\' message when first_name is omitted in request', function () {
      const req = mockRequest(signupData.scenarios.withoutFirstName);
      const { error } = Joi.validate(req.body, signupSchema);
      validateBody(signupSchema)(req, res, next);
      res.status.calledWith(400).should.equal(true);
      res.json.calledWith({
        status: 400,
        error: error.details[0].message,
      }).should.equal(true);
      next.called.should.equal(false);
    });
    it('should return \'first_name is not valid\' message when req.first_name is not a valid first_name', function () {
      const req = mockRequest(signupData.scenarios.withInvalidFirstName);
      const { error } = Joi.validate(req.body, signupSchema);
      validateBody(signupSchema)(req, res, next);
      res.status.calledWith(400).should.equal(true);
      res.json.calledWith({
        status: 400,
        error: error.details[0].message,
      }).should.equal(true);
      next.called.should.equal(false);
    });
    it('should return \'last_name field is required\' message when last_name is omitted in request', function () {
      const req = mockRequest(signupData.scenarios.withoutLastName);
      const { error } = Joi.validate(req.body, signupSchema);
      validateBody(signupSchema)(req, res, next);
      res.status.calledWith(400).should.equal(true);
      res.json.calledWith({
        status: 400,
        error: error.details[0].message,
      }).should.equal(true);
      next.called.should.equal(false);
    });
    it('should return \'last_name is not valid\' message when req.last_name is not a valid last_name', function () {
      const req = mockRequest(signupData.scenarios.withInvalidLastName);
      const { error } = Joi.validate(req.body, signupSchema);
      validateBody(signupSchema)(req, res, next);
      res.status.calledWith(400).should.equal(true);
      res.json.calledWith({
        status: 400,
        error: error.details[0].message,
      }).should.equal(true);
      next.called.should.equal(false);
    });
    it('should return next() when all required fields are provided and are valid', function () {
      const req = mockRequest(signupData.scenarios.withValidDetails);
      const { value } = Joi.validate(req.body, signupSchema);
      validateBody(signupSchema)(req, res, next);
      req.value.body.should.deep.equal(value);
      next.calledOnce.should.equal(true);
    });
  });

  describe('Signin Schema', function () {
    it('should return \'"email" is required\' message when email is omitted in request', function () {
      const req = mockRequest(signinData.scenarios.withoutEmail);
      const { error } = Joi.validate(req.body, signinSchema);
      validateBody(signinSchema)(req, res, next);
      res.status.calledWith(400).should.equal(true);
      res.json.calledWith({
        status: 400,
        error: error.details[0].message,
      }).should.equal(true);
      next.called.should.equal(false);
    });
    it('should return \'"email" must be a valid email\' message when req.email is not a valid email', function () {
      const req = mockRequest(signinData.scenarios.withInvalidEmail);
      const { error } = Joi.validate(req.body, signinSchema);
      validateBody(signinSchema)(req, res, next);
      res.status.calledWith(400).should.equal(true);
      res.json.calledWith({
        status: 400,
        error: error.details[0].message,
      }).should.equal(true);
      next.called.should.equal(false);
    });
    it('should return \'"password" is required\' message when password is omitted in request', function () {
      const req = mockRequest(signinData.scenarios.withoutPassword);
      const { error } = Joi.validate(req.body, signinSchema);
      validateBody(signinSchema)(req, res, next);
      res.status.calledWith(400).should.equal(true);
      res.json.calledWith({
        status: 400,
        error: error.details[0].message,
      }).should.equal(true);
      next.called.should.equal(false);
    });
    it('should return \'"password" length must be at least 6 characters long\' message when req.password is not a valid password', function () {
      const req = mockRequest(signinData.scenarios.withInvalidPassword);
      const { error } = Joi.validate(req.body, signinSchema);
      validateBody(signinSchema)(req, res, next);
      res.status.calledWith(400).should.equal(true);
      next.called.should.equal(false);
      res.json.calledWith({
        status: 400,
        error: error.details[0].message,
      }).should.equal(true);
    });
    it('should return next() when all required fields are provided and are valid', function () {
      const req = mockRequest(signinData.scenarios.withValidDetails);
      const { value } = Joi.validate(req.body, signinSchema);
      validateBody(signinSchema)(req, res, next);
      req.value.body.should.deep.equal(value);
      next.calledOnce.should.equal(true);
    });
  });

  describe('getAllTrips Schema', function () {
    it('should return \'"user_id" is required\' message when user_id is omitted in request', function () {
      const req = mockRequest(tripsData.getAllTripsData.scenarios.withoutUserId);
      const { error } = Joi.validate(req.body, getAllTrips);
      validateBody(getAllTrips)(req, res, next);
      res.status.calledWith(400).should.equal(true);
      res.json.calledWith({
        status: 400,
        error: error.details[0].message,
      }).should.equal(true);
      next.called.should.equal(false);
    });
    it('should return \'"user_id" must be a number\' message when req.user_id is not a number', function () {
      const req = mockRequest(tripsData.getAllTripsData.scenarios.withInvalidUserId);
      const { error } = Joi.validate(req.body, getAllTrips);
      validateBody(getAllTrips)(req, res, next);
      res.status.calledWith(400).should.equal(true);
      res.json.calledWith({
        status: 400,
        error: error.details[0].message,
      }).should.equal(true);
      next.called.should.equal(false);
    });
    it('should return \'"user_id" must be larger than or equal to 1\' message when req.user_id is zero', function () {
      const req = mockRequest(tripsData.getAllTripsData.scenarios.withZeroAsUserId);
      const { error } = Joi.validate(req.body, getAllTrips);
      validateBody(getAllTrips)(req, res, next);
      res.status.calledWith(400).should.equal(true);
      res.json.calledWith({
        status: 400,
        error: error.details[0].message,
      }).should.equal(true);
      next.called.should.equal(false);
    });
    it('should return \'"is_admin" is required\' message when is_admin is omitted in request', function () {
      const req = mockRequest(tripsData.getAllTripsData.scenarios.withoutIsAdmin);
      const { error } = Joi.validate(req.body, getAllTrips);
      validateBody(getAllTrips)(req, res, next);
      res.status.calledWith(400).should.equal(true);
      res.json.calledWith({
        status: 400,
        error: error.details[0].message,
      }).should.equal(true);
      next.called.should.equal(false);
    });
    it('should return \'"is_admin" must be a boolean\' message when req.is_admin is not a valid is_admin', function () {
      const req = mockRequest(tripsData.getAllTripsData.scenarios.withInvalidIsAdmin);
      const { error } = Joi.validate(req.body, getAllTrips);
      validateBody(getAllTrips)(req, res, next);
      res.status.calledWith(400).should.equal(true);
      res.json.calledWith({
        status: 400,
        error: error.details[0].message,
      }).should.equal(true);
      next.called.should.equal(false);
    });
    it('should return next() when all required fields are provided and are valid', function () {
      const req = mockRequest(tripsData.getAllTripsData.scenarios.withValidDetails);
      const { value } = Joi.validate(req.body, getAllTrips);
      validateBody(getAllTrips)(req, res, next);
      req.value.body.should.deep.equal(value);
      next.calledOnce.should.equal(true);
    });
  });

  describe('createTrip Schema', function () {
    it('should return \'"user_id" is required\' message when user_id is omitted in request', function () {
      const req = mockRequest(tripsData.createTripData.scenarios.withoutUserId);
      const { error } = Joi.validate(req.body, createTrip);
      validateBody(createTrip)(req, res, next);
      res.status.calledWith(400).should.equal(true);
      res.json.calledWith({
        status: 400,
        error: error.details[0].message,
      }).should.equal(true);
      next.called.should.equal(false);
    });
    it('should return \'"user_id" must be a number\' message when req.user_id is not a number', function () {
      const req = mockRequest(tripsData.createTripData.scenarios.withInvalidUserId);
      const { error } = Joi.validate(req.body, createTrip);
      validateBody(createTrip)(req, res, next);
      res.status.calledWith(400).should.equal(true);
      res.json.calledWith({
        status: 400,
        error: error.details[0].message,
      }).should.equal(true);
      next.called.should.equal(false);
    });
    it('should return \'"user_id" must be larger than or equal to 1\' message when req.user_id is zero', function () {
      const req = mockRequest(tripsData.createTripData.scenarios.withZeroAsUserId);
      const { error } = Joi.validate(req.body, createTrip);
      validateBody(createTrip)(req, res, next);
      res.status.calledWith(400).should.equal(true);
      res.json.calledWith({
        status: 400,
        error: error.details[0].message,
      }).should.equal(true);
      next.called.should.equal(false);
    });
    it('should return \'"is_admin" is required\' message when is_admin is omitted in request', function () {
      const req = mockRequest(tripsData.createTripData.scenarios.withoutIsAdmin);
      const { error } = Joi.validate(req.body, createTrip);
      validateBody(createTrip)(req, res, next);
      res.status.calledWith(400).should.equal(true);
      res.json.calledWith({
        status: 400,
        error: error.details[0].message,
      }).should.equal(true);
      next.called.should.equal(false);
    });
    it('should return \'"is_admin" must be a boolean\' message when req.is_admin is not a valid is_admin', function () {
      const req = mockRequest(tripsData.createTripData.scenarios.withInvalidIsAdmin);
      const { error } = Joi.validate(req.body, createTrip);
      validateBody(createTrip)(req, res, next);
      res.status.calledWith(400).should.equal(true);
      res.json.calledWith({
        status: 400,
        error: error.details[0].message,
      }).should.equal(true);
      next.called.should.equal(false);
    });
    it('should return \'"bus_id" is required\' message when bus_id is omitted in request', function () {
      const req = mockRequest(tripsData.createTripData.scenarios.withoutBusId);
      const { error } = Joi.validate(req.body, createTrip);
      validateBody(createTrip)(req, res, next);
      res.status.calledWith(400).should.equal(true);
      res.json.calledWith({
        status: 400,
        error: error.details[0].message,
      }).should.equal(true);
      next.called.should.equal(false);
    });
    it('should return \'"bus_id" must be a number\' message when req.bus_id is not a number', function () {
      const req = mockRequest(tripsData.createTripData.scenarios.withInvalidBusId);
      const { error } = Joi.validate(req.body, createTrip);
      validateBody(createTrip)(req, res, next);
      res.status.calledWith(400).should.equal(true);
      res.json.calledWith({
        status: 400,
        error: error.details[0].message,
      }).should.equal(true);
      next.called.should.equal(false);
    });
    it('should return \'"bus_id" must be larger than or equal to 1\' message when req.bus_id is zero', function () {
      const req = mockRequest(tripsData.createTripData.scenarios.withZeroAsBusId);
      const { error } = Joi.validate(req.body, createTrip);
      validateBody(createTrip)(req, res, next);
      res.status.calledWith(400).should.equal(true);
      res.json.calledWith({
        status: 400,
        error: error.details[0].message,
      }).should.equal(true);
      next.called.should.equal(false);
    });
    it('should return \'"origin" is required\' message when origin is omitted in request', function () {
      const req = mockRequest(tripsData.createTripData.scenarios.withoutOrigin);
      const { error } = Joi.validate(req.body, createTrip);
      validateBody(createTrip)(req, res, next);
      res.status.calledWith(400).should.equal(true);
      res.json.calledWith({
        status: 400,
        error: error.details[0].message,
      }).should.equal(true);
      next.called.should.equal(false);
    });
    it('should return \'\' message when req.origin is not of the required format', function () {
      const req = mockRequest(tripsData.createTripData.scenarios.withInvalidOrigin);
      const { error } = Joi.validate(req.body, createTrip);
      validateBody(createTrip)(req, res, next);
      res.status.calledWith(400).should.equal(true);
      res.json.calledWith({
        status: 400,
        error: error.details[0].message,
      }).should.equal(true);
      next.called.should.equal(false);
    });
    it('should return \'"destination" is required\' message when destination is omitted in request', function () {
      const req = mockRequest(tripsData.createTripData.scenarios.withoutDestination);
      const { error } = Joi.validate(req.body, createTrip);
      validateBody(createTrip)(req, res, next);
      res.status.calledWith(400).should.equal(true);
      res.json.calledWith({
        status: 400,
        error: error.details[0].message,
      }).should.equal(true);
      next.called.should.equal(false);
    });
    it('should return \'\' message when req.destination is not of the required format', function () {
      const req = mockRequest(tripsData.createTripData.scenarios.withInvalidDestination);
      const { error } = Joi.validate(req.body, createTrip);
      validateBody(createTrip)(req, res, next);
      res.status.calledWith(400).should.equal(true);
      res.json.calledWith({
        status: 400,
        error: error.details[0].message,
      }).should.equal(true);
      next.called.should.equal(false);
    });
    it('should return \'"trip_date" is required\' message when trip_date is omitted in request', function () {
      const req = mockRequest(tripsData.createTripData.scenarios.withoutTripDate);
      const { error } = Joi.validate(req.body, createTrip);
      validateBody(createTrip)(req, res, next);
      res.status.calledWith(400).should.equal(true);
      res.json.calledWith({
        status: 400,
        error: error.details[0].message,
      }).should.equal(true);
      next.called.should.equal(false);
    });
    it(`should return "trip_date" must be larger than or equal to ${getToday()} message when req.trip_date is on or before today`, function () {
      const req = mockRequest(tripsData.createTripData.scenarios.withTripDateBeforeToday);
      const { error } = Joi.validate(req.body, createTrip);
      validateBody(createTrip)(req, res, next);
      res.status.calledWith(400).should.equal(true);
      res.json.calledWith({
        status: 400,
        error: error.details[0].message,
      }).should.equal(true);
      next.called.should.equal(false);
    });
    it(`should return "trip_date" must be less than or equal to ${getNextSevenDays()} message when req.trip_date is more than seven days from today`, function () {
      const req = mockRequest(tripsData.createTripData.scenarios.withTripDateBeyondSevenDays);
      const { error } = Joi.validate(req.body, createTrip);
      validateBody(createTrip)(req, res, next);
      res.status.calledWith(400).should.equal(true);
      res.json.calledWith({
        status: 400,
        error: error.details[0].message,
      }).should.equal(true);
      next.called.should.equal(false);
    });
    it('should return \'"trip_date" must be a valid ISO 8601 date\' message when req.trip_date is not a valid date', function () {
      const req = mockRequest(tripsData.createTripData.scenarios.withInvalidTripDate);
      const { error } = Joi.validate(req.body, createTrip);
      validateBody(createTrip)(req, res, next);
      res.status.calledWith(400).should.equal(true);
      res.json.calledWith({
        status: 400,
        error: error.details[0].message,
      }).should.equal(true);
      next.called.should.equal(false);
    });
    it('should return \'"fare" is required\' message when fare is omitted in request', function () {
      const req = mockRequest(tripsData.createTripData.scenarios.withoutFare);
      const { error } = Joi.validate(req.body, createTrip);
      validateBody(createTrip)(req, res, next);
      res.status.calledWith(400).should.equal(true);
      res.json.calledWith({
        status: 400,
        error: error.details[0].message,
      }).should.equal(true);
      next.called.should.equal(false);
    });
    it('should return \'"fare" must be a number\' message when req.fare is not of the required format', function () {
      const req = mockRequest(tripsData.createTripData.scenarios.withInvalidFare);
      const { error } = Joi.validate(req.body, createTrip);
      validateBody(createTrip)(req, res, next);
      res.status.calledWith(400).should.equal(true);
      res.json.calledWith({
        status: 400,
        error: error.details[0].message,
      }).should.equal(true);
      next.called.should.equal(false);
    });
    it('should return \'"fare" must be larger than or equal to 1000\' message when req.fare is less than 1000', function () {
      const req = mockRequest(tripsData.createTripData.scenarios.withLesserFare);
      const { error } = Joi.validate(req.body, createTrip);
      validateBody(createTrip)(req, res, next);
      res.status.calledWith(400).should.equal(true);
      res.json.calledWith({
        status: 400,
        error: error.details[0].message,
      }).should.equal(true);
      next.called.should.equal(false);
    });
    it('should return \'"fare" must be smaller than or equal to 15000\' message when req.fare is greater than 15000', function () {
      const req = mockRequest(tripsData.createTripData.scenarios.withGreaterFare);
      const { error } = Joi.validate(req.body, createTrip);
      validateBody(createTrip)(req, res, next);
      res.status.calledWith(400).should.equal(true);
      res.json.calledWith({
        status: 400,
        error: error.details[0].message,
      }).should.equal(true);
      next.called.should.equal(false);
    });
    it('should return next() when all required fields are provided and are valid', function () {
      const req = mockRequest(tripsData.createTripData.scenarios.withValidDetails);
      const { value } = Joi.validate(req.body, createTrip);
      validateBody(createTrip)(req, res, next);
      req.value.body.should.deep.equal(value);
      next.calledOnce.should.equal(true);
    });
  });
});
