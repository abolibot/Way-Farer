/* eslint-env node, mocha */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
import chai from 'chai';
import sinon from 'sinon';
import bcrypt from 'bcrypt';

import userModel from '../../server/models/Users';
import signupData from '../../server/helpers/testData/signup';
import signinData from '../../server/helpers/testData/signin';
import authController from '../../server/controllers/AuthController';
import authentication from '../../server/middlewares/authentication';
import utils from './utils';

chai.should();
const { res, mockRequest, mockUser } = utils;
const user = mockUser();

describe('AuthController', function () {
  beforeEach(function () {
    sinon.stub(res, 'status').returns(res);
    sinon.stub(res, 'json').returns(res);
  });

  afterEach(function () {
    utils.res.status.restore();
    utils.res.json.restore();
  });

  after(function () {
    authentication.generateToken.restore();
  });

  describe('signup', function () {
    afterEach(function () {
      userModel.emailInUse.restore();
      userModel.createUser.restore();
    });

    after(function () {
      authentication.generateToken.restore();
    });

    it('should return \'email already exists\' message when req.email already exist', async function () {
      const req = mockRequest(signupData.scenarios.withExistingDetails);

      const mockEmailInUse = sinon.stub(userModel, 'emailInUse').returns(true);
      const mockCreateUser = sinon.stub(userModel, 'createUser').returns(user);

      await authController.signup(req, res);
      res.status.calledWith(409).should.equal(true);
      mockEmailInUse.calledOnce.should.equal(true);
      mockCreateUser.called.should.equal(false);
      res.json.calledWith({
        status: 409,
        error: 'User with EMAIL already exist',
      }).should.equal(true);
    });

    it('should return \'error message\' message when there is an error checking if email exists', async function () {
      const req = mockRequest(signupData.scenarios.withValidDetails);

      const mockEmailInUse = sinon.stub(userModel, 'emailInUse').returns({ error: 'error message' });
      const mockCreateUser = sinon.stub(userModel, 'createUser').returns(user);

      await authController.signup(req, res);
      res.status.calledWith(500).should.equal(true);
      mockEmailInUse.calledOnce.should.equal(true);
      mockCreateUser.called.should.equal(false);
      res.json.calledWith({
        status: 500,
        error: 'error message',
      }).should.equal(true);
    });

    it('should return \'error message\' message when there is an error creating a user', async function () {
      const req = mockRequest(signupData.scenarios.withValidDetails);

      const mockEmailInUse = sinon.stub(userModel, 'emailInUse').returns(false);
      const mockCreateUser = sinon.stub(userModel, 'createUser').returns({ error: 'error message' });

      await authController.signup(req, res);
      res.status.calledWith(500).should.equal(true);
      mockEmailInUse.calledOnce.should.equal(true);
      mockCreateUser.calledOnce.should.equal(true);
      res.json.calledWith({
        status: 500,
        error: 'error message',
      }).should.equal(true);
    });

    it('should return user\'s details on submission of valid details', async function () {
      const req = mockRequest(signupData.scenarios.withValidDetails);

      const mockEmailInUse = sinon.stub(userModel, 'emailInUse').returns(false);
      const mockCreateUser = sinon.stub(userModel, 'createUser').returns(user);
      const mockGenerateToken = sinon.stub(authentication, 'generateToken').returns('generatedtoken');

      await authController.signup(req, res);
      res.status.calledWith(201).should.equal(true);
      mockEmailInUse.calledOnce.should.equal(true);
      mockCreateUser.calledOnce.should.equal(true);
      mockGenerateToken.calledOnce.should.equal(true);
      res.json.calledWith({
        status: 201,
        message: 'user created successfully',
        data: {
          user_id: user.id,
          is_admin: user.is_admin,
          token: 'generatedtoken',
        },
      }).should.equal(true);
    });
  });

  describe('signin', function () {
    afterEach(function () {
      userModel.findUserByEmail.restore();
      bcrypt.compare.restore();
    });

    it('should return \'invalid login details\' when user with email is not found', async function () {
      const req = mockRequest(signinData.scenarios.emailDoesnotExist);
      const mockFindUserByEmail = sinon.stub(userModel, 'findUserByEmail').returns(null);
      const mockBcryptCompare = sinon.stub(bcrypt, 'compare').returns(true);

      await authController.signin(req, res);
      res.status.calledWith(400).should.equal(true);
      res.json.calledWith({
        status: 400,
        error: 'invalid login details',
      }).should.equal(true);
      mockFindUserByEmail.calledOnce.should.equal(true);
      mockBcryptCompare.called.should.equal(false);
    });
    it('should return \'error message\' message when there is an error checking if user with email exist', async function () {
      const req = mockRequest(signinData.scenarios.user);

      const mockFindUserByEmail = sinon.stub(userModel, 'findUserByEmail').returns({ error: 'error message' });
      const mockBcryptCompare = sinon.stub(bcrypt, 'compare').returns(true);

      await authController.signin(req, res);
      res.status.calledWith(500).should.equal(true);
      res.json.calledWith({
        status: 500,
        error: 'error message',
      }).should.equal(true);
      mockFindUserByEmail.calledOnce.should.equal(true);
      mockBcryptCompare.calledOnce.should.equal(false);
    });
    it('should return \'invalid login details\' when password does not match', async function () {
      const req = mockRequest(signinData.scenarios.withIncorrectPassword);
      const mockFindUserByEmail = sinon.stub(userModel, 'findUserByEmail').returns(user);
      const mockBcryptCompare = sinon.stub(bcrypt, 'compare').returns(false);
      await authController.signin(req, res);
      res.status.calledWith(400).should.equal(true);
      res.json.calledWith({
        status: 400,
        error: 'invalid login details',
      }).should.equal(true);
      mockFindUserByEmail.calledOnce.should.equal(true);
      mockBcryptCompare.calledOnce.should.equal(true);
    });
    it('should return \'user\'s details\' on successful login', async function () {
      const req = mockRequest(signinData.scenarios.user);
      const mockFindUserByEmail = sinon.stub(userModel, 'findUserByEmail').returns(user);
      const mockBcryptCompare = sinon.stub(bcrypt, 'compare').returns(true);
      const mockGenerateToken = sinon.stub(authentication, 'generateToken').returns('generatedtoken');

      await authController.signin(req, res);
      res.status.calledWith(200).should.equal(true);
      mockFindUserByEmail.calledOnce.should.equal(true);
      mockBcryptCompare.calledOnce.should.equal(true);
      mockGenerateToken.calledOnce.should.equal(true);
      res.json.calledWith({
        status: 200,
        message: 'user signin successful',
        data: {
          user_id: user.id,
          is_admin: user.is_admin,
          token: 'generatedtoken',
        },
      }).should.equal(true);
    });
  });
});
