/* eslint-env node, mocha */
import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../../server/server';
import signupData from '../../server/helpers/testData/signup';

chai.use(chaiHttp);
chai.should();

describe('POST /api/v1/auth/signup', () => {
  it('should return \'email field is required\' message when email is omitted in request', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(signupData.scenarios.withoutEmail)
      .end((err, res) => {
        res.status.should.be.equal(400);
        res.body.should.have.property('status');
        res.body.should.have.property('error');
        res.body.status.should.equal(400);
        res.body.error.should.equal('"email" is required');
      });
    done();
  });

  it('should return \'email is not valid\' message when req.email is not a valid email', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(signupData.scenarios.withInvalidEmail)
      .end((err, res) => {
        res.status.should.be.equal(400);
        res.body.should.have.property('status');
        res.body.should.have.property('error');
        res.body.status.should.equal(400);
        res.body.error.should.equal('"email" must be a valid email');
      });
    done();
  });

  it('should return \'password field is required\' message when password is omitted in request', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(signupData.scenarios.withoutPassword)
      .end((err, res) => {
        res.status.should.be.equal(400);
        res.body.should.have.property('status');
        res.body.should.have.property('error');
        res.body.status.should.equal(400);
        res.body.error.should.equal('"password" is required');
      });
    done();
  });

  it('should return \'password is not valid\' message when req.password is not a valid password', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(signupData.scenarios.withInvalidPassword)
      .end((err, res) => {
        res.status.should.be.equal(400);
        res.body.should.have.property('status');
        res.body.should.have.property('error');
        res.body.status.should.equal(400);
        res.body.error.should.equal('"password" length must be at least 6 characters long');
      });
    done();
  });

  it('should return \'first_name field is required\' message when first_name is omitted in request', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(signupData.scenarios.withoutFirstName)
      .end((err, res) => {
        res.status.should.be.equal(400);
        res.body.should.have.property('status');
        res.body.should.have.property('error');
        res.body.status.should.equal(400);
        res.body.error.should.equal('"firstName" is required');
      });
    done();
  });

  it('should return \'first_name is not valid\' message when req.first_name is not a valid first_name', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(signupData.scenarios.withInvalidFirstName)
      .end((err, res) => {
        res.status.should.be.equal(400);
        res.body.should.have.property('status');
        res.body.should.have.property('error');
        res.body.status.should.equal(400);
        res.body.error.should.equal(`"firstName" with value "${signupData.scenarios.withInvalidFirstName.firstName}" fails to match the required pattern: /^([a-zA-Z]{2,30}[-]{0,1}[a-zA-Z]{2,30})$/`);
      });
    done();
  });

  it('should return \'last_name field is required\' message when last_name is omitted in request', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(signupData.scenarios.withoutLastName)
      .end((err, res) => {
        res.status.should.be.equal(400);
        res.body.should.have.property('status');
        res.body.should.have.property('error');
        res.body.status.should.equal(400);
        res.body.error.should.equal('"lastName" is required');
      });
    done();
  });

  it('should return \'last_name is not valid\' message when req.last_name is not a valid last_name', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(signupData.scenarios.withInvalidLastName)
      .end((err, res) => {
        res.status.should.be.equal(400);
        res.body.should.have.property('status');
        res.body.should.have.property('error');
        res.body.status.should.equal(400);
        res.body.error.should.equal(`"lastName" with value "${signupData.scenarios.withInvalidLastName.lastName}" fails to match the required pattern: /^([a-zA-Z]{2,30}[-]{0,1}[a-zA-Z]{2,30})$/`);
      });
    done();
  });

  it('should return user\'s details on submission of valid details', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(signupData.scenarios.withValidDetails)
      .then((res) => {
        res.status.should.be.equal(201);
        res.body.should.have.property('status');
        res.body.should.have.property('message');
        res.body.should.have.property('data');
        res.body.message.should.equal('user created successfully');
        res.body.status.should.equal(201);
        res.body.data.should.be.an('object');
        res.body.data.should.have.a.property('user_id');
        res.body.data.should.have.a.property('is_admin');
        res.body.data.should.have.a.property('token');
      })
      .catch(err => err);
    done();
  });

  it('should return \'email already exists\' message when req.email already exist', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(signupData.scenarios.withExistingDetails)
      .end((err, res) => {
        res.status.should.be.equal(409);
        res.body.should.have.property('status');
        res.body.should.have.property('error');
        res.body.status.should.equal(409);
        res.body.error.should.equal('User with EMAIL already exist');
      });
    done();
  });
});
