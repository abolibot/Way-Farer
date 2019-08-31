import {
  getNextEightDays,
  getPreviousDay,
  getNextFiveDays,
} from '../getDates';

const trips = {
  getAllTripsData: {
    scenarios: {
      withoutUserId: {
        is_admin: false,
      },

      withInvalidUserId: {
        user_id: 'fdsf',
        is_admin: false,
      },

      withZeroAsUserId: {
        user_id: 0,
        is_admin: false,
      },

      withoutIsAdmin: {
        user_id: 2,
      },

      withInvalidIsAdmin: {
        user_id: 2,
        is_admin: 'falsedfjhg',
      },

      withValidDetails: {
        user_id: 2,
        is_admin: false,
      },

      withUndefinedReqHeadersAuthorization: {
        user_id: 2,
        is_admin: false,
      },

      withInvalidToken: {
        user_id: 2,
        is_admin: false,
      },

      withUserAuthenticated: {
        user_id: 1,
        is_admin: false,
      },
    },
    allTrips: [
      {
        trip_id: 1,
        bus_id: 1,
        origin: 'Abuja',
        destination: 'Lagos',
        trip_date: '2019-07-26',
        fare: '8700',
      },
      {
        trip_id: 2,
        bus_id: 3,
        origin: 'Benin',
        destination: 'Lagos',
        trip_date: '2019-07-26',
        fare: '5000',
      },
      {
        trip_id: 3,
        bus_id: 2,
        origin: 'Sokoto',
        destination: 'Lagos',
        trip_date: '2019-07-26',
        fare: '12000',
      },
    ],
  },

  createTripData: {
    validUser: {
      id: 1,
      first_name: 'Test',
      last_name: 'User',
      email: 'testUser@gmail.com',
      is_admin: true,
    },

    invalidUser: {
      id: 2,
      first_name: 'Invalid',
      last_name: 'User',
      email: 'invalidUser@gmail.com',
      is_admin: true,
    },

    createdTrip: {
      trip_id: 2,
      bus_id: 3,
      origin: 'Benin',
      destination: 'Lagos',
      trip_date: '2019-07-26',
      fare: '5000',
    },

    scenarios: {
      withUserAuthenticated: {
        user_id: 1,
        is_admin: true,
        bus_id: 1,
        origin: 'Lagos',
        destination: 'Abuja',
        trip_date: getNextFiveDays(),
        fare: 8750,
      },

      withoutUserId: {
        is_admin: true,
        bus_id: 1,
        origin: 'Lagos',
        destination: 'Abuja',
        trip_date: getNextFiveDays(),
        fare: 8750,
      },

      withInvalidUserId: {
        user_id: 'a1',
        is_admin: true,
        bus_id: 1,
        origin: 'Lagos',
        destination: 'Abuja',
        trip_date: getNextFiveDays(),
        fare: 8750,
      },

      withZeroAsUserId: {
        user_id: 0,
        is_admin: true,
        bus_id: 1,
        origin: 'Lagos',
        destination: 'Abuja',
        trip_date: getNextFiveDays(),
        fare: 8750,
      },

      withoutIsAdmin: {
        user_id: 1,
        bus_id: 1,
        origin: 'Lagos',
        destination: 'Abuja',
        trip_date: getNextFiveDays(),
        fare: 8750,
      },

      withInvalidIsAdmin: {
        user_id: 1,
        is_admin: 'dffsdf',
        bus_id: 1,
        origin: 'Lagos',
        destination: 'Abuja',
        trip_date: getNextFiveDays(),
        fare: 8750,
      },

      withoutBusId: {
        user_id: 1,
        is_admin: true,
        origin: 'Lagos',
        destination: 'Abuja',
        trip_date: getNextFiveDays(),
        fare: 8750,
      },

      withInvalidBusId: {
        user_id: 1,
        is_admin: true,
        bus_id: 'as1',
        origin: 'Lagos',
        destination: 'Abuja',
        trip_date: getNextFiveDays(),
        fare: 8750,
      },

      withZeroAsBusId: {
        user_id: 1,
        is_admin: true,
        bus_id: 0,
        origin: 'Lagos',
        destination: 'Abuja',
        trip_date: getNextFiveDays(),
        fare: 8750,
      },

      withoutOrigin: {
        user_id: 1,
        is_admin: true,
        bus_id: 1,
        destination: 'Abuja',
        trip_date: getNextFiveDays(),
        fare: 8750,
      },

      withInvalidOrigin: {
        user_id: 1,
        is_admin: true,
        bus_id: 1,
        origin: ' Lagos',
        destination: 'Abuja',
        trip_date: getNextFiveDays(),
        fare: 8750,
      },

      withoutDestination: {
        user_id: 1,
        is_admin: true,
        bus_id: 1,
        origin: 'Lagos',
        trip_date: getNextFiveDays(),
        fare: 8750,
      },

      withInvalidDestination: {
        user_id: 1,
        is_admin: true,
        bus_id: 1,
        origin: 'Lagos',
        destination: ' Abuja',
        trip_date: getNextFiveDays(),
        fare: 8750,
      },

      withoutTripDate: {
        user_id: 1,
        is_admin: true,
        bus_id: 1,
        origin: 'Lagos',
        destination: 'Abuja',
        fare: 8750,
      },

      withTripDateBeforeToday: {
        user_id: 1,
        is_admin: true,
        bus_id: 1,
        origin: 'Lagos',
        destination: 'Abuja',
        trip_date: getPreviousDay(),
        fare: 8750,
      },

      withTripDateBeyondSevenDays: {
        user_id: 1,
        is_admin: true,
        bus_id: 1,
        origin: 'Lagos',
        destination: 'Abuja',
        trip_date: getNextEightDays(),
        fare: 8750,
      },

      withInvalidTripDate: {
        user_id: 1,
        is_admin: true,
        bus_id: 1,
        origin: 'Lagos',
        destination: 'Abuja',
        trip_date: 'vefsdvse',
        fare: 8750,
      },

      withoutFare: {
        user_id: 1,
        is_admin: true,
        bus_id: 1,
        origin: 'Lagos',
        destination: 'Abuja',
        trip_date: getNextFiveDays(),
      },

      withInvalidFare: {
        user_id: 1,
        is_admin: true,
        bus_id: 1,
        origin: 'Lagos',
        destination: 'Abuja',
        trip_date: getNextFiveDays(),
        fare: '8750wjd',
      },

      withLesserFare: {
        user_id: 1,
        is_admin: true,
        bus_id: 1,
        origin: 'Lagos',
        destination: 'Abuja',
        trip_date: getNextFiveDays(),
        fare: 900,
      },

      withGreaterFare: {
        user_id: 1,
        is_admin: true,
        bus_id: 1,
        origin: 'Lagos',
        destination: 'Abuja',
        trip_date: getNextFiveDays(),
        fare: 15100,
      },

      withValidDetails: {
        user_id: 1,
        is_admin: true,
        bus_id: 1,
        origin: 'Lagos',
        destination: 'Abuja',
        trip_date: getNextFiveDays(),
        fare: 14000,
      },

      withFalseIsAdmin: {
        user_id: 1,
        is_admin: false,
        bus_id: 1,
        origin: 'Lagos',
        destination: 'Abuja',
        trip_date: getNextFiveDays(),
        fare: 14000,
      },

      withUndefinedReqHeadersAuthorization: {
        user_id: 1,
        is_admin: true,
        bus_id: 1,
        origin: 'Lagos',
        destination: 'Abuja',
        trip_date: getNextFiveDays(),
        fare: 15000,
      },

      withInvalidToken: {
        user_id: 2,
        is_admin: true,
        bus_id: 1,
        origin: 'Lagos',
        destination: 'Abuja',
        trip_date: getNextFiveDays(),
        fare: 15000,
      },
    },
  },
};

export default trips;
