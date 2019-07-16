/* eslint-env node, mocha */
import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../../server/server';
import tripsData from '../../server/helpers/testData/trips';

chai.use(chaiHttp);
chai.should();

const { getAllTripsData } = tripsData;

describe('GET /api/v1/trips', () => {
  it('should return \'"token" is required\' message when token is omitted in request', (done) => {
    chai.request(app)
      .get('/api/v1/trips')
      .send(getAllTripsData.scenarios.withoutToken)
      .end((err, res) => {
        res.status.should.be.equal(400);
        res.body.should.have.property('status');
        res.body.should.have.property('error');
        res.body.status.should.equal(400);
        res.body.error.should.equal('"token" is required');
      });
    done();
  });

  it('should return \'\' message when req.token is not a valid token', (done) => {
    chai.request(app)
      .get('/api/v1/trips')
      .send(getAllTripsData.scenarios.withInvalidTokenFormat)
      .end((err, res) => {
        res.status.should.be.equal();
        res.body.should.have.property('status');
        res.body.should.have.property('error');
        res.body.status.should.equal();
        res.body.error.should.equal('');
      });
    done();
  });

  it('should return \'"user_id" is required\' message when user_id is omitted in request', (done) => {
    chai.request(app)
      .get('/api/v1/trips')
      .send(getAllTripsData.scenarios.withoutUserId)
      .end((err, res) => {
        res.status.should.be.equal(400);
        res.body.should.have.property('status');
        res.body.should.have.property('error');
        res.body.status.should.equal(400);
        res.body.error.should.equal('"user_id" is required');
      });
    done();
  });

  it('should return \'\' message when req.user_id is not a valid user_id', (done) => {
    chai.request(app)
      .get('/api/v1/trips')
      .send(getAllTripsData.scenarios.withInvalidUserId)
      .end((err, res) => {
        res.status.should.be.equal();
        res.body.should.have.property('status');
        res.body.should.have.property('error');
        res.body.status.should.equal();
        res.body.error.should.equal('');
      });
    done();
  });

  it('should return \'"is_admin" is required\' message when is_admin is omitted in request', (done) => {
    chai.request(app)
      .get('/api/v1/trips')
      .send(getAllTripsData.scenarios.withoutIsAdmin)
      .end((err, res) => {
        res.status.should.be.equal();
        res.body.should.have.property('status');
        res.body.should.have.property('error');
        res.body.status.should.equal();
        res.body.error.should.equal('"is_admin" is required');
      });
    done();
  });

  it('should return \'\' message when req.is_admin is not a valid is_admin', (done) => {
    chai.request(app)
      .get('/api/v1/trips')
      .send(getAllTripsData.scenarios.withInvalidIsAdmin)
      .end((err, res) => {
        res.status.should.be.equal(401);
        res.body.should.have.property('status');
        res.body.should.have.property('error');
        res.body.status.should.equal(401);
        res.body.error.should.equal('');
      });
    done();
  });

  it('should return \'You need a token to access this route\' message when req.headers.authorization is undefined', (done) => {
    chai.request(app)
      .get('/api/v1/trips')
      .send(getAllTripsData.scenarios.withUndefinedReqHeadersAuthorization)
      .end((err, res) => {
        res.status.should.be.equal(401);
        res.body.should.have.property('status');
        res.body.should.have.property('error');
        res.body.status.should.equal(401);
        res.body.error.should.equal('you need a token to access this route');
      });
    done();
  });

  it('should return \'\' message when user could not be authenticated', (done) => {
    chai.request(app)
      .get('/api/v1/trips')
      .send(getAllTripsData.scenarios.withUserUnauthenticated)
      .end((err, res) => {
        res.status.should.be.equal(401);
        res.body.should.have.property('status');
        res.body.should.have.property('error');
        res.body.status.should.equal(401);
        res.body.error.should.equal('you do not have permissions to access this endpoint');
      });
    done();
  });

  it('should return \'invalid token\' message when there is an error validating token', (done) => {
    chai.request(app)
      .get('/api/v1/trips')
      .send(getAllTripsData.scenarios.withInvalidToken)
      .end((err, res) => {
        res.status.should.be.equal(401);
        res.body.should.have.property('status');
        res.body.should.have.property('error');
        res.body.status.should.equal(401);
        res.body.error.should.equal('invalid token');
      });
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
