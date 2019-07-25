/* eslint-env node, mocha */
import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../../server/server';
import tripsData from '../../server/helpers/testData/trips';

chai.use(chaiHttp);
chai.should();

const { getAllTripsData, createTripData } = tripsData;

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

describe('POST /api/v1/trips', () => {
  it('should return \'"user_id" is required\' message when user_id is omitted in request', (done) => {
    chai.request(app)
      .post('/api/v1/trips')
      .send(createTripData.scenarios.withoutUserId)
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
      .post('/api/v1/trips')
      .send(createTripData.scenarios.withInvalidUserId)
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
      .post('/api/v1/trips')
      .send(createTripData.scenarios.withZeroAsUserId)
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
      .post('/api/v1/trips')
      .send(createTripData.scenarios.withoutIsAdmin)
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
      .post('/api/v1/trips')
      .send(createTripData.scenarios.withInvalidIsAdmin)
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

  it('should return \'"bus_id" is required\' message when bus_id is omitted in request', (done) => {
    chai.request(app)
      .post('/api/v1/trips')
      .send(createTripData.scenarios.withoutBusId)
      .then((res) => {
        res.status.should.be.equal(400);
        res.body.should.have.property('status');
        res.body.should.have.property('error');
        res.body.status.should.equal(400);
        res.body.error.should.equal('"bus_id" is required');
      })
      .catch(err => err);
    done();
  });

  it('should return \'"bus_id" must be a number\' message when req.bus_id is not a number', (done) => {
    chai.request(app)
      .post('/api/v1/trips')
      .send(createTripData.scenarios.withInvalidBusId)
      .then((res) => {
        res.status.should.be.equal(400);
        res.body.should.have.property('status');
        res.body.should.have.property('error');
        res.body.status.should.equal(400);
        res.body.error.should.equal('"bus_id" must be a number');
      })
      .catch(err => err);
    done();
  });

  it('should return \'"bus_id" must be larger than or equal to 1\' message when req.bus_id is zero', (done) => {
    chai.request(app)
      .post('/api/v1/trips')
      .send(createTripData.scenarios.withZeroAsBusId)
      .then((res) => {
        res.status.should.be.equal(400);
        res.body.should.have.property('status');
        res.body.should.have.property('error');
        res.body.status.should.equal(400);
        res.body.error.should.equal('"bus_id" must be larger than or equal to 1');
      })
      .catch(err => err);
    done();
  });

  it('should return \'"origin" is required\' message when origin is omitted in request', (done) => {
    chai.request(app)
      .post('/api/v1/trips')
      .send(createTripData.scenarios.withoutOrigin)
      .then((res) => {
        res.status.should.be.equal(400);
        res.body.should.have.property('status');
        res.body.should.have.property('error');
        res.body.status.should.equal(400);
        res.body.error.should.equal('"origin" is required');
      })
      .catch(err => err);
    done();
  });

  it('should return \'\' message when req.origin is not of the required format', (done) => {
    chai.request(app)
      .post('/api/v1/trips')
      .send(createTripData.scenarios.withInvalidOrigin)
      .then((res) => {
        res.status.should.be.equal(400);
        res.body.should.have.property('status');
        res.body.should.have.property('error');
        res.body.status.should.equal(400);
        res.body.error.should.equal(`"origin" with value "${createTripData.scenarios.withInvalidOrigin.origin}" fails to match the required pattern: /^([a-zA-Z0-9]{2,30}[- ]{0,1}[a-zA-Z0-9]{2,30})$/`);
      })
      .catch(err => err);
    done();
  });

  it('should return \'"destination" is required\' message when destination is omitted in request', (done) => {
    chai.request(app)
      .post('/api/v1/trips')
      .send(createTripData.scenarios.withoutDestination)
      .then((res) => {
        res.status.should.be.equal(400);
        res.body.should.have.property('status');
        res.body.should.have.property('error');
        res.body.status.should.equal(400);
        res.body.error.should.equal('"destination" is required');
      })
      .catch(err => err);
    done();
  });

  it('should return \'\' message when req.destination is not of the required format', (done) => {
    chai.request(app)
      .post('/api/v1/trips')
      .send(createTripData.scenarios.withInvalidDestination)
      .then((res) => {
        res.status.should.be.equal(400);
        res.body.should.have.property('status');
        res.body.should.have.property('error');
        res.body.status.should.equal(400);
        res.body.error.should.equal(`"destination" with value "${createTripData.scenarios.withInvalidDestination.destination}" fails to match the required pattern: /^([a-zA-Z0-9]{2,30}[- ]{0,1}[a-zA-Z0-9]{2,30})$/`);
      })
      .catch(err => err);
    done();
  });

  it('should return \'"trip_date" is required\' message when trip_date is omitted in request', (done) => {
    chai.request(app)
      .post('/api/v1/trips')
      .send(createTripData.scenarios.withoutTripDate)
      .then((res) => {
        res.status.should.be.equal(400);
        res.body.should.have.property('status');
        res.body.should.have.property('error');
        res.body.status.should.equal(400);
        res.body.error.should.equal('"trip_date" is required');
      })
      .catch(err => err);
    done();
  });

  it('should return \'\' message when req.trip_date is before today', (done) => {
    chai.request(app)
      .post('/api/v1/trips')
      .send(createTripData.scenarios.withTripDateBeforeToday)
      .then((res) => {
        res.status.should.be.equal(400);
        res.body.should.have.property('status');
        res.body.should.have.property('error');
        res.body.status.should.equal(400);
        res.body.error.should.equal();
      })
      .catch(err => err);
    done();
  });

  it('should return \'\' message when req.trip_date is more than seven days from today', (done) => {
    chai.request(app)
      .post('/api/v1/trips')
      .send(createTripData.scenarios.withTripDateBeyondSevenDays)
      .then((res) => {
        res.status.should.be.equal(400);
        res.body.should.have.property('status');
        res.body.should.have.property('error');
        res.body.status.should.equal(400);
        res.body.error.should.equal();
      })
      .catch(err => err);
    done();
  });

  it('should return \'\' message when req.trip_date is not a valid date', (done) => {
    chai.request(app)
      .post('/api/v1/trips')
      .send(createTripData.scenarios.withInvalidTripDate)
      .then((res) => {
        res.status.should.be.equal(400);
        res.body.should.have.property('status');
        res.body.should.have.property('error');
        res.body.status.should.equal(400);
        res.body.error.should.equal();
      })
      .catch(err => err);
    done();
  });

  it('should return \'"fare" is required\' message when fare is omitted in request', (done) => {
    chai.request(app)
      .post('/api/v1/trips')
      .send(createTripData.scenarios.withoutFare)
      .then((res) => {
        res.status.should.be.equal(400);
        res.body.should.have.property('status');
        res.body.should.have.property('error');
        res.body.status.should.equal(400);
        res.body.error.should.equal('"fare" is required');
      })
      .catch(err => err);
    done();
  });

  it('should return \'"fare" must be a number\' message when req.fare is not of the required format', (done) => {
    chai.request(app)
      .post('/api/v1/trips')
      .send(createTripData.scenarios.withInvalidFare)
      .then((res) => {
        res.status.should.be.equal(400);
        res.body.should.have.property('status');
        res.body.should.have.property('error');
        res.body.status.should.equal(400);
        res.body.error.should.equal('"fare" must be a number');
      })
      .catch(err => err);
    done();
  });

  it('should return \'"fare" must be larger than or equal to 1000\' message when req.fare is less than 1000', (done) => {
    chai.request(app)
      .post('/api/v1/trips')
      .send(createTripData.scenarios.withLesserFare)
      .then((res) => {
        res.status.should.be.equal(400);
        res.body.should.have.property('status');
        res.body.should.have.property('error');
        res.body.status.should.equal(400);
        res.body.error.should.equal('"fare" must be larger than or equal to 1000');
      })
      .catch(err => err);
    done();
  });

  it('should return \'"fare" must be smaller than or equal to 15000\' message when req.fare is greater than 15000', (done) => {
    chai.request(app)
      .post('/api/v1/trips')
      .send(createTripData.scenarios.withGreaterFare)
      .then((res) => {
        res.status.should.be.equal(400);
        res.body.should.have.property('status');
        res.body.should.have.property('error');
        res.body.status.should.equal(400);
        res.body.error.should.equal('"fare" must be smaller than or equal to 15000');
      })
      .catch(err => err);
    done();
  });

  it('should return \'You need a token to access this route\' message when req.headers.authorization is undefined', (done) => {
    chai.request(app)
      .post('/api/v1/trips')
      .send(createTripData.scenarios.withUndefinedReqHeadersAuthorization)
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
      .post('/api/v1/trips')
      .send(createTripData.scenarios.withInvalidToken)
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

  it('should return the trip\'s details on sucessful authentication and creation', (done) => {
    chai.request(app)
      .post('/api/v1/trips')
      .send(createTripData.scenarios.withUserAuthenticated)
      .then((res) => {
        res.status.should.be.equal(200);
        res.body.should.have.property('status');
        res.body.should.have.property('message');
        res.body.should.have.property('data');
        res.body.message.should.equal('trip created successfully');
        res.body.status.should.equal(200);
        res.body.data.should.be.an('object');
        res.body.data.should.have.a.property('trip_id');
        res.body.data.should.have.a.property('bus_id');
        res.body.data.should.have.a.property('origin');
        res.body.data.should.have.a.property('destination');
        res.body.data.should.have.a.property('trip_date');
        res.body.data.should.have.a.property('fare');
      })
      .catch(err => err);
    done();
  });
});
