/* eslint-env node, mocha */
import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../../server/server';
import tripsData from '../../server/helpers/testData/trips';

chai.use(chaiHttp);
chai.should();

const { getAllTripsData } = tripsData;

describe('GET /api/v1/trips', () => {
  it('should return \'"user_id" is required\' message when user_id is omitted in request', (done) => {
    chai.request(app)
      .get('/api/v1/trips')
      .send(getAllTripsData.scenarios.withoutUserId)
      .then((res) => {
        res.status.should.be.equal(400);
        res.body.should.have.property('status');
        res.body.should.have.property('error');
        res.body.status.should.equal(400);
        res.body.error.should.equal('"user_id" is required');
      })
      .catch(err => err);
    done();
  });

  it('should return \'"user_id" must be a number\' message when req.user_id is not a number', (done) => {
    chai.request(app)
      .get('/api/v1/trips')
      .send(getAllTripsData.scenarios.withInvalidUserId)
      .then((res) => {
        res.status.should.be.equal(400);
        res.body.should.have.property('status');
        res.body.should.have.property('error');
        res.body.status.should.equal(400);
        res.body.error.should.equal('"user_id" must be a number');
      })
      .catch(err => err);
    done();
  });

  it('should return \'"user_id" must be larger than or equal to 1\' message when req.user_id is zero', (done) => {
    chai.request(app)
      .get('/api/v1/trips')
      .send(getAllTripsData.scenarios.withZeroAsUserId)
      .then((res) => {
        res.status.should.be.equal(400);
        res.body.should.have.property('status');
        res.body.should.have.property('error');
        res.body.status.should.equal(400);
        res.body.error.should.equal('"user_id" must be larger than or equal to 1');
      })
      .catch(err => err);
    done();
  });

  it('should return \'"is_admin" is required\' message when is_admin is omitted in request', (done) => {
    chai.request(app)
      .get('/api/v1/trips')
      .send(getAllTripsData.scenarios.withoutIsAdmin)
      .then((res) => {
        res.status.should.be.equal(400);
        res.body.should.have.property('status');
        res.body.should.have.property('error');
        res.body.status.should.equal(400);
        res.body.error.should.equal('"is_admin" is required');
      })
      .catch(err => err);
    done();
  });

  it('should return \'"is_admin" must be a boolean\' message when req.is_admin is not a valid is_admin', (done) => {
    chai.request(app)
      .get('/api/v1/trips')
      .send(getAllTripsData.scenarios.withInvalidIsAdmin)
      .then((res) => {
        res.status.should.be.equal(400);
        res.body.should.have.property('status');
        res.body.should.have.property('error');
        res.body.status.should.equal(400);
        res.body.error.should.equal('"is_admin" must be a boolean');
      })
      .catch(err => err);
    done();
  });

  it('should return \'You need a token to access this route\' message when req.headers.authorization is undefined', (done) => {
    chai.request(app)
      .get('/api/v1/trips')
      .send(getAllTripsData.scenarios.withUndefinedReqHeadersAuthorization)
      .then((res) => {
        res.status.should.be.equal(401);
        res.body.should.have.property('status');
        res.body.should.have.property('error');
        res.body.status.should.equal(401);
        res.body.error.should.equal('You need a token to access this route');
      })
      .catch(err => err);
    done();
  });

  it('should return \'invalid token\' message when there is an error validating token', (done) => {
    chai.request(app)
      .get('/api/v1/trips')
      .send(getAllTripsData.scenarios.withInvalidToken)
      .then((err, res) => {
        res.status.should.be.equal(401);
        res.body.should.have.property('status');
        res.body.should.have.property('error');
        res.body.status.should.equal(401);
        res.body.error.should.equal('invalid token');
      })
      .catch(err => err);
    done();
  });

  it('should return all trips on sucessful authentication', (done) => {
    chai.request(app)
      .get('/api/v1/trips')
      .send(getAllTripsData.scenarios.withUserAuthenticated)
      .then((res) => {
        res.status.should.be.equal(200);
        res.body.should.have.property('status');
        res.body.should.have.property('count');
        res.body.should.have.property('data');
        res.body.count.should.a('number');
        res.body.status.should.equal(200);
        res.body.data.should.be.an('array');
      })
      .catch(err => err);
    done();
  });
});
