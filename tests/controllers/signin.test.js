/* eslint-env node, mocha */
import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../../server/server';
import signinData from '../../server/helpers/testData/signin';

chai.use(chaiHttp);
chai.should();

describe('POST /api/v1/auth/signin', () => {
  it('should return \'"email" is required\' message when email is omitted in request', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(signinData.scenarios.withoutEmail)
      .end((err, res) => {
        res.status.should.be.equal(400);
        res.body.should.have.property('status');
        res.body.should.have.property('error');
        res.body.status.should.equal(400);
        res.body.error.should.equal('"email" is required');
      });
    done();
  });

  it('should return \'"email" must be a valid email\' message when req.email is not a valid email', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(signinData.scenarios.withInvalidEmail)
      .end((err, res) => {
        res.status.should.be.equal(400);
        res.body.should.have.property('status');
        res.body.should.have.property('error');
        res.body.status.should.equal(400);
        res.body.error.should.equal('"email" must be a valid email');
      });
    done();
  });

  it('should return \'"password" is required\' message when password is omitted in request', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(signinData.scenarios.withoutPassword)
      .end((err, res) => {
        res.status.should.be.equal(400);
        res.body.should.have.property('status');
        res.body.should.have.property('error');
        res.body.status.should.equal(400);
        res.body.error.should.equal('"password" is required');
      });
    done();
  });

  it('should return \'"password" length must be at least 6 characters long\' message when req.password is not a valid password', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(signinData.scenarios.withInvalidPassword)
      .end((err, res) => {
        res.status.should.be.equal(400);
        res.body.should.have.property('status');
        res.body.should.have.property('error');
        res.body.status.should.equal(400);
        res.body.error.should.equal('"password" length must be at least 6 characters long');
      });
    done();
  });

  it('email doesn\'t exist', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'existingemail@gmail.com',
        password: signinData.users[0].password,
      })
      .end((err, res) => {
        res.status.should.be.equal(400);
        res.body.should.have.property('status');
        res.body.should.have.property('error');
        res.body.status.should.equal(400);
        res.body.error.should.equal('invalid login details');
      });
    done();
  });

  it('incorrect password', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: signinData.users[0].email,
        password: `${signinData.users[0].password}abah`,
      })
      .end((err, res) => {
        res.status.should.be.equal(400);
        res.body.should.have.property('status');
        res.body.should.have.property('error');
        res.body.status.should.equal(400);
        res.body.error.should.equal('invalid login details');
      });
    done();
  });

  it('authentication passed', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: signinData.users[0].email,
        password: signinData.users[0].password,
      })
      .then((res) => {
        res.status.should.be.equal(200);
        res.body.should.have.property('status');
        res.body.should.have.property('message');
        res.body.should.have.property('data');
        res.body.message.should.equal('user signin successful');
        res.body.status.should.equal(200);
        res.body.data.should.be.an('object');
        res.body.data.should.have.a.property('user_id');
        res.body.data.should.have.a.property('is_admin');
        res.body.data.should.have.a.property('token');
      })
      .catch(err => err);
    done();
  });
});
