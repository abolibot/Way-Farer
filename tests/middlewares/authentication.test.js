/* eslint-env node, mocha */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
import chai from 'chai';
import jwt from 'jsonwebtoken';
import sinon from 'sinon';
import tripData from '../../server/helpers/testData/trips';
import userModel from '../../server/models/Users';
import authentication from '../../server/middlewares/authentication';
import utils from '../utils';
// import { getNextFiveDays } from '../../server/helpers/getDates';

chai.should();
const { res, mockUser } = utils;
const { verifyToken, getToken, isUserAdmin } = authentication;
const user = mockUser();

describe('Authentication Middleware', function () {
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

  describe('Verify Token', function () {
    const mockRequest = (userData) => {
      const req = {
        value: {
          body: userData,
        },
        token: 'dsfnavkjsdngjfng',
        headers: {
          authorization: 'bearer dsfnavkjsdngjfng',
        },
        user,
      };
      return req;
    };
    const req = mockRequest(tripData.createTripData.scenarios.withValidDetails);

    afterEach(function () {
      userModel.findUserByEmail.restore();
      jwt.verify.restore();
    });

    it('should return \'error message\' when there is an error finding user', async function () {
      const mockJWTVerify = sinon.stub(jwt, 'verify').returns({ email: 'testU@gmail.com' });
      const mockFindUserByEmail = sinon.stub(userModel, 'findUserByEmail').returns({ error: 'error message' });

      await verifyToken(req, res, next);
      res.status.calledWith(500).should.equal(true);
      res.json.calledWith({
        status: 500,
        error: 'error message',
      }).should.equal(true);
      mockJWTVerify.calledOnce.should.equal(true);
      mockFindUserByEmail.calledOnce.should.equal(true);
      next.called.should.equal(false);
    });
    it('should return \'invalid token message\' when no user found', async function () {
      const mockJWTVerify = sinon.stub(jwt, 'verify').returns({ email: 'testU@gmail.com' });
      const mockFindUserByEmail = sinon.stub(userModel, 'findUserByEmail').returns(false);

      await verifyToken(req, res, next);
      res.status.calledWith(401).should.equal(true);
      res.json.calledWith({
        status: 401,
        error: 'invalid token',
      }).should.equal(true);
      mockJWTVerify.calledOnce.should.equal(true);
      mockFindUserByEmail.calledOnce.should.equal(true);
      next.called.should.equal(false);
    });
    it('should return \'invalid token message\' when user ID does not match', async function () {
      const mockJWTVerify = sinon.stub(jwt, 'verify').returns({ email: 'testU@gmail.com' });
      const mockFindUserByEmail = sinon.stub(userModel, 'findUserByEmail').returns({
        id: 2,
        email: 'testU@gmail.com',
        password: 'pass4321',
        firstName: 'Test',
        lastName: 'User',
        is_admin: true,
      });

      await verifyToken(req, res, next);
      res.status.calledWith(401).should.equal(true);
      res.json.calledWith({
        status: 401,
        error: 'invalid token',
      }).should.equal(true);
      mockJWTVerify.calledOnce.should.equal(true);
      mockFindUserByEmail.calledOnce.should.equal(true);
      next.called.should.equal(false);
    });
    it('should return \'invalid token message\' when isAdmin does not match', async function () {
      const mockJWTVerify = sinon.stub(jwt, 'verify').returns({ email: 'testU@gmail.com' });
      const mockFindUserByEmail = sinon.stub(userModel, 'findUserByEmail').returns({
        id: 1,
        email: 'testU@gmail.com',
        password: 'pass4321',
        firstName: 'Test',
        lastName: 'User',
        is_admin: false,
      });

      await verifyToken(req, res, next);
      res.status.calledWith(401).should.equal(true);
      res.json.calledWith({
        status: 401,
        error: 'invalid token',
      }).should.equal(true);
      mockJWTVerify.calledOnce.should.equal(true);
      mockFindUserByEmail.calledOnce.should.equal(true);
      next.called.should.equal(false);
    });
    it('should return \'error message\' when there is an error verifying token', async function () {
      const mockJWTVerify = sinon.stub(jwt, 'verify').throws();
      const mockFindUserByEmail = sinon.stub(userModel, 'findUserByEmail').returns(user);

      await verifyToken(req, res, next);
      res.status.calledWith(500).should.equal(true);
      mockJWTVerify.calledOnce.should.equal(true);
      mockFindUserByEmail.calledOnce.should.equal(false);
      next.called.should.equal(false);
    });
    it('should return next() when token was verified sucessfully', async function () {
      const mockJWTVerify = sinon.stub(jwt, 'verify').returns({ email: 'testU@gmail.com' });
      const mockFindUserByEmail = sinon.stub(userModel, 'findUserByEmail').returns(user);
      await verifyToken(req, res, next);
      mockJWTVerify.calledOnce.should.equal(true);
      mockFindUserByEmail.calledOnce.should.equal(true);
      req.user.should.deep.equal(user);
      next.calledOnce.should.equal(true);
    });
  });
  describe('Get Token', function () {
    it('should return \'You need a token to access this route\' message when req.headers.authorization is undefined', function () {
      const mockRequest = (userData) => {
        const req = {
          value: {
            body: userData,
          },
          token: 'dsfnavkjsdngjfng',
          headers: {
            authorization: undefined,
          },
          user,
        };
        return req;
      };
      const req = mockRequest(tripData.createTripData.scenarios.withValidDetails);
      getToken(req, res, next);
      res.status.calledWith(401).should.equal(true);
      res.json.calledWith({
        status: 401,
        error: 'You need a token to access this route',
      }).should.equal(true);
      next.called.should.equal(false);
    });
    it('should return next() when token was gotten sucessfully', function () {
      const mockRequest = (userData) => {
        const req = {
          value: {
            body: userData,
          },
          token: 'dsfnavkjsdngjfng',
          headers: {
            authorization: 'bearer dsfnavkjsdngjfng',
          },
          user,
        };
        return req;
      };
      const req = mockRequest(tripData.createTripData.scenarios.withValidDetails);
      getToken(req, res, next);
      req.token.should.deep.equal('dsfnavkjsdngjfng');
      next.calledOnce.should.equal(true);
    });
  });
  describe('Is User Admin', function () {
    it('should return \'You do not have permissions to access this endpoint\' message when user is not an admin', function () {
      const mockRequest = (userData) => {
        const req = {
          value: {
            body: userData,
          },
          token: 'dsfnavkjsdngjfng',
          headers: {
            authorization: 'bearer dsfnavkjsdngjfng',
          },
          user: {
            id: 1,
            email: 'testU@gmail.com',
            password: 'pass4321',
            firstName: 'Test',
            lastName: 'User',
            is_admin: false,
          },
        };
        return req;
      };
      const req = mockRequest(tripData.createTripData.scenarios.withFalseIsAdmin);
      isUserAdmin(req, res, next);
      res.status.calledWith(401).should.equal(true);
      res.json.calledWith({
        status: 401,
        error: 'You do not have permissions to access this endpoint',
      }).should.equal(true);
      next.called.should.equal(false);
    });
    it('should return next() when is_admin is true', function () {
      const mockRequest = (userData) => {
        const req = {
          value: {
            body: userData,
          },
          token: 'dsfnavkjsdngjfng',
          headers: {
            authorization: 'bearer dsfnavkjsdngjfng',
          },
          user,
        };
        return req;
      };
      const req = mockRequest(tripData.createTripData.scenarios.withValidDetails);
      isUserAdmin(req, res, next);
      next.calledOnce.should.equal(true);
    });
  });
});
