/* eslint-env node, mocha */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
import chai from 'chai';
import sinon from 'sinon';

import tripModel from '../../server/models/Trips';
import tripData from '../../server/helpers/testData/trips';
import tripController from '../../server/controllers/Trips';
import utils from '../utils';

chai.should();
const { res, mockRequest } = utils;

describe('TripController', function () {
  beforeEach(function () {
    sinon.stub(res, 'status').returns(res);
    sinon.stub(res, 'json').returns(res);
  });

  afterEach(function () {
    utils.res.status.restore();
    utils.res.json.restore();
  });

  describe('getAllTrips', function () {
    afterEach(function () {
      tripModel.getAllTrips.restore();
    });

    it('should return \'error message\' when there is an error getting all trips', async function () {
      const req = mockRequest(tripData.getAllTripsData.scenarios.withUserAuthenticated);
      const mockGetAllTrips = sinon.stub(tripModel, 'getAllTrips').returns({ error: 'error message' });

      await tripController.getAllTrips(req, res);
      res.status.calledWith(500).should.equal(true);
      mockGetAllTrips.calledOnce.should.equal(true);
      res.json.calledWith({
        status: 500,
        error: 'error message',
      }).should.equal(true);
    });
    it('should return \'details of all trips\' on successful request', async function () {
      const req = mockRequest(tripData.getAllTripsData.scenarios.withUserAuthenticated);
      const mockGetAllTrips = sinon.stub(tripModel, 'getAllTrips').returns(tripData.getAllTripsData.allTrips);

      await tripController.getAllTrips(req, res);
      res.status.calledWith(200).should.equal(true);
      mockGetAllTrips.calledOnce.should.equal(true);
      res.json.calledWith({
        status: 200,
        count: 3,
        data: tripData.getAllTripsData.allTrips,
      }).should.equal(true);
    });
  });

  describe('createTrip', function () {
    afterEach(function () {
      tripModel.createTrip.restore();
    });
    it('should return \'error message\' when there is an error creating a trip', async function () {
      const req = mockRequest(tripData.createTripData.scenarios.withUserAuthenticated);
      const mockGetAllTrips = sinon.stub(tripModel, 'createTrip').returns({ error: 'error message' });

      await tripController.createTrip(req, res);
      res.status.calledWith(500).should.equal(true);
      mockGetAllTrips.calledOnce.should.equal(true);
      res.json.calledWith({
        status: 500,
        error: 'error message',
      }).should.equal(true);
    });
    it('should return \'details of trip\' on successful creation', async function () {
      const req = mockRequest(tripData.createTripData.scenarios.withUserAuthenticated);
      const mockGetAllTrips = sinon.stub(tripModel, 'createTrip').returns(tripData.createTripData.createdTrip);

      await tripController.createTrip(req, res);
      res.status.calledWith(201).should.equal(true);
      mockGetAllTrips.calledOnce.should.equal(true);
      res.json.calledWith({
        status: 201,
        message: 'Trip created successfully',
        data: tripData.createTripData.createdTrip,
      }).should.equal(true);
    });
  });
});
