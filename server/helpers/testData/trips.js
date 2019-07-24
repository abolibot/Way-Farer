import { getNextSevenDays, getNextEightDays, getPreviousDay } from '../getDates';

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

      withUndefinedReqHeadersAuthorization: {
        token: undefined,
        user_id: 2,
        is_admin: false,
      },

      withInvalidToken: {
        token: 'iLCJlbWFpbCI6ImtvYmVicnlhbnRAZ21haWwuY29tIiwiaXNfYWRtaW4iOmZhbHNlLCJpYXQiOjE1NjMyOTQwNjcsImV4cCI6MTU2MzM4MDQ2N30.qohOQ7fJYJ6bz_R3TptO7FmP0MyPY6goITOvYY4hpYgeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZmlyc3RfbmFtZSI6IktvYmUiLCJsYXN0X25hbWUiOiJCcnlhbnQ',
        user_id: 2,
        is_admin: false,
      },

      withUserAuthenticated: {
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZmlyc3RfbmFtZSI6IktvYmUiLCJsYXN0X25hbWUiOiJCcnlhbnQiLCJlbWFpbCI6ImtvYmVicnlhbnRAZ21haWwuY29tIiwiaXNfYWRtaW4iOmZhbHNlLCJpYXQiOjE1NjMyOTQwNjcsImV4cCI6MTU2MzM4MDQ2N30.qohOQ7fJYJ6bz_R3TptO7FmP0MyPY6goITOvYY4hpYg',
        user_id: 2,
        is_admin: false,
      },
    },
  },

  createTripData: {
    scenarios: {
      withUserAuthenticated: {
        user_id: 1,
        is_admin: true,
        bus_id: 1,
        origin: 'Lagos',
        destination: 'Abuja',
        trip_date: getNextSevenDays(),
        fare: 8750,
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZmlyc3RfbmFtZSI6IktvYmUiLCJsYXN0X25hbWUiOiJCcnlhbnQiLCJlbWFpbCI6ImtvYmVicnlhbnRAZ21haWwuY29tIiwiaXNfYWRtaW4iOmZhbHNlLCJpYXQiOjE1NjMyOTQwNjcsImV4cCI6MTU2MzM4MDQ2N30.qohOQ7fJYJ6bz_R3TptO7FmP0MyPY6goITOvYY4hpYg',
      },

      withoutUserId: {
        is_admin: true,
        bus_id: 1,
        origin: 'Lagos',
        destination: 'Abuja',
        trip_date: getNextSevenDays(),
        fare: 8750,
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZmlyc3RfbmFtZSI6IktvYmUiLCJsYXN0X25hbWUiOiJCcnlhbnQiLCJlbWFpbCI6ImtvYmVicnlhbnRAZ21haWwuY29tIiwiaXNfYWRtaW4iOmZhbHNlLCJpYXQiOjE1NjMyOTQwNjcsImV4cCI6MTU2MzM4MDQ2N30.qohOQ7fJYJ6bz_R3TptO7FmP0MyPY6goITOvYY4hpYg',
      },

      withInvalidUserId: {
        user_id: 'a1',
        is_admin: true,
        bus_id: 1,
        origin: 'Lagos',
        destination: 'Abuja',
        trip_date: getNextSevenDays(),
        fare: 8750,
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZmlyc3RfbmFtZSI6IktvYmUiLCJsYXN0X25hbWUiOiJCcnlhbnQiLCJlbWFpbCI6ImtvYmVicnlhbnRAZ21haWwuY29tIiwiaXNfYWRtaW4iOmZhbHNlLCJpYXQiOjE1NjMyOTQwNjcsImV4cCI6MTU2MzM4MDQ2N30.qohOQ7fJYJ6bz_R3TptO7FmP0MyPY6goITOvYY4hpYg',
      },

      withZeroAsUserId: {
        user_id: 0,
        is_admin: true,
        bus_id: 1,
        origin: 'Lagos',
        destination: 'Abuja',
        trip_date: getNextSevenDays(),
        fare: 8750,
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZmlyc3RfbmFtZSI6IktvYmUiLCJsYXN0X25hbWUiOiJCcnlhbnQiLCJlbWFpbCI6ImtvYmVicnlhbnRAZ21haWwuY29tIiwiaXNfYWRtaW4iOmZhbHNlLCJpYXQiOjE1NjMyOTQwNjcsImV4cCI6MTU2MzM4MDQ2N30.qohOQ7fJYJ6bz_R3TptO7FmP0MyPY6goITOvYY4hpYg',
      },

      withoutIsAdmin: {
        user_id: 1,
        bus_id: 1,
        origin: 'Lagos',
        destination: 'Abuja',
        trip_date: getNextSevenDays(),
        fare: 8750,
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZmlyc3RfbmFtZSI6IktvYmUiLCJsYXN0X25hbWUiOiJCcnlhbnQiLCJlbWFpbCI6ImtvYmVicnlhbnRAZ21haWwuY29tIiwiaXNfYWRtaW4iOmZhbHNlLCJpYXQiOjE1NjMyOTQwNjcsImV4cCI6MTU2MzM4MDQ2N30.qohOQ7fJYJ6bz_R3TptO7FmP0MyPY6goITOvYY4hpYg',
      },

      withInvalidIsAdmin: {
        user_id: 1,
        is_admin: 'dffsdf',
        bus_id: 1,
        origin: 'Lagos',
        destination: 'Abuja',
        trip_date: getNextSevenDays(),
        fare: 8750,
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZmlyc3RfbmFtZSI6IktvYmUiLCJsYXN0X25hbWUiOiJCcnlhbnQiLCJlbWFpbCI6ImtvYmVicnlhbnRAZ21haWwuY29tIiwiaXNfYWRtaW4iOmZhbHNlLCJpYXQiOjE1NjMyOTQwNjcsImV4cCI6MTU2MzM4MDQ2N30.qohOQ7fJYJ6bz_R3TptO7FmP0MyPY6goITOvYY4hpYg',
      },

      withoutBusId: {
        user_id: 1,
        is_admin: true,
        origin: 'Lagos',
        destination: 'Abuja',
        trip_date: getNextSevenDays(),
        fare: 8750,
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZmlyc3RfbmFtZSI6IktvYmUiLCJsYXN0X25hbWUiOiJCcnlhbnQiLCJlbWFpbCI6ImtvYmVicnlhbnRAZ21haWwuY29tIiwiaXNfYWRtaW4iOmZhbHNlLCJpYXQiOjE1NjMyOTQwNjcsImV4cCI6MTU2MzM4MDQ2N30.qohOQ7fJYJ6bz_R3TptO7FmP0MyPY6goITOvYY4hpYg',
      },

      withInvalidBusId: {
        user_id: 1,
        is_admin: true,
        bus_id: 'as1',
        origin: 'Lagos',
        destination: 'Abuja',
        trip_date: getNextSevenDays(),
        fare: 8750,
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZmlyc3RfbmFtZSI6IktvYmUiLCJsYXN0X25hbWUiOiJCcnlhbnQiLCJlbWFpbCI6ImtvYmVicnlhbnRAZ21haWwuY29tIiwiaXNfYWRtaW4iOmZhbHNlLCJpYXQiOjE1NjMyOTQwNjcsImV4cCI6MTU2MzM4MDQ2N30.qohOQ7fJYJ6bz_R3TptO7FmP0MyPY6goITOvYY4hpYg',
      },

      withZeroAsBusId: {
        user_id: 1,
        is_admin: true,
        bus_id: 0,
        origin: 'Lagos',
        destination: 'Abuja',
        trip_date: getNextSevenDays(),
        fare: 8750,
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZmlyc3RfbmFtZSI6IktvYmUiLCJsYXN0X25hbWUiOiJCcnlhbnQiLCJlbWFpbCI6ImtvYmVicnlhbnRAZ21haWwuY29tIiwiaXNfYWRtaW4iOmZhbHNlLCJpYXQiOjE1NjMyOTQwNjcsImV4cCI6MTU2MzM4MDQ2N30.qohOQ7fJYJ6bz_R3TptO7FmP0MyPY6goITOvYY4hpYg',
      },

      withoutOrigin: {
        user_id: 1,
        is_admin: true,
        bus_id: 1,
        destination: 'Abuja',
        trip_date: getNextSevenDays(),
        fare: 8750,
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZmlyc3RfbmFtZSI6IktvYmUiLCJsYXN0X25hbWUiOiJCcnlhbnQiLCJlbWFpbCI6ImtvYmVicnlhbnRAZ21haWwuY29tIiwiaXNfYWRtaW4iOmZhbHNlLCJpYXQiOjE1NjMyOTQwNjcsImV4cCI6MTU2MzM4MDQ2N30.qohOQ7fJYJ6bz_R3TptO7FmP0MyPY6goITOvYY4hpYg',
      },

      withInvalidOrigin: {
        user_id: 1,
        is_admin: true,
        bus_id: 1,
        origin: ' Lagos',
        destination: 'Abuja',
        trip_date: getNextSevenDays(),
        fare: 8750,
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZmlyc3RfbmFtZSI6IktvYmUiLCJsYXN0X25hbWUiOiJCcnlhbnQiLCJlbWFpbCI6ImtvYmVicnlhbnRAZ21haWwuY29tIiwiaXNfYWRtaW4iOmZhbHNlLCJpYXQiOjE1NjMyOTQwNjcsImV4cCI6MTU2MzM4MDQ2N30.qohOQ7fJYJ6bz_R3TptO7FmP0MyPY6goITOvYY4hpYg',
      },

      withoutDestination: {
        user_id: 1,
        is_admin: true,
        bus_id: 1,
        origin: 'Lagos',
        trip_date: getNextSevenDays(),
        fare: 8750,
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZmlyc3RfbmFtZSI6IktvYmUiLCJsYXN0X25hbWUiOiJCcnlhbnQiLCJlbWFpbCI6ImtvYmVicnlhbnRAZ21haWwuY29tIiwiaXNfYWRtaW4iOmZhbHNlLCJpYXQiOjE1NjMyOTQwNjcsImV4cCI6MTU2MzM4MDQ2N30.qohOQ7fJYJ6bz_R3TptO7FmP0MyPY6goITOvYY4hpYg',
      },

      withInvalidDestination: {
        user_id: 1,
        is_admin: true,
        bus_id: 1,
        origin: 'Lagos',
        destination: ' Abuja',
        trip_date: getNextSevenDays(),
        fare: 8750,
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZmlyc3RfbmFtZSI6IktvYmUiLCJsYXN0X25hbWUiOiJCcnlhbnQiLCJlbWFpbCI6ImtvYmVicnlhbnRAZ21haWwuY29tIiwiaXNfYWRtaW4iOmZhbHNlLCJpYXQiOjE1NjMyOTQwNjcsImV4cCI6MTU2MzM4MDQ2N30.qohOQ7fJYJ6bz_R3TptO7FmP0MyPY6goITOvYY4hpYg',
      },

      withoutTripDate: {
        user_id: 1,
        is_admin: true,
        bus_id: 1,
        origin: 'Lagos',
        destination: 'Abuja',
        fare: 8750,
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZmlyc3RfbmFtZSI6IktvYmUiLCJsYXN0X25hbWUiOiJCcnlhbnQiLCJlbWFpbCI6ImtvYmVicnlhbnRAZ21haWwuY29tIiwiaXNfYWRtaW4iOmZhbHNlLCJpYXQiOjE1NjMyOTQwNjcsImV4cCI6MTU2MzM4MDQ2N30.qohOQ7fJYJ6bz_R3TptO7FmP0MyPY6goITOvYY4hpYg',
      },

      withTripDateBeforeToday: {
        user_id: 1,
        is_admin: true,
        bus_id: 1,
        origin: 'Lagos',
        destination: 'Abuja',
        trip_date: getPreviousDay(),
        fare: 8750,
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZmlyc3RfbmFtZSI6IktvYmUiLCJsYXN0X25hbWUiOiJCcnlhbnQiLCJlbWFpbCI6ImtvYmVicnlhbnRAZ21haWwuY29tIiwiaXNfYWRtaW4iOmZhbHNlLCJpYXQiOjE1NjMyOTQwNjcsImV4cCI6MTU2MzM4MDQ2N30.qohOQ7fJYJ6bz_R3TptO7FmP0MyPY6goITOvYY4hpYg',
      },

      withTripDateBeyondSevenDays: {
        user_id: 1,
        is_admin: true,
        bus_id: 1,
        origin: 'Lagos',
        destination: 'Abuja',
        trip_date: getNextEightDays(),
        fare: 8750,
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZmlyc3RfbmFtZSI6IktvYmUiLCJsYXN0X25hbWUiOiJCcnlhbnQiLCJlbWFpbCI6ImtvYmVicnlhbnRAZ21haWwuY29tIiwiaXNfYWRtaW4iOmZhbHNlLCJpYXQiOjE1NjMyOTQwNjcsImV4cCI6MTU2MzM4MDQ2N30.qohOQ7fJYJ6bz_R3TptO7FmP0MyPY6goITOvYY4hpYg',
      },

      withInvalidTripDate: {
        user_id: 1,
        is_admin: true,
        bus_id: 1,
        origin: 'Lagos',
        destination: 'Abuja',
        trip_date: 'vefsdvse',
        fare: 8750,
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZmlyc3RfbmFtZSI6IktvYmUiLCJsYXN0X25hbWUiOiJCcnlhbnQiLCJlbWFpbCI6ImtvYmVicnlhbnRAZ21haWwuY29tIiwiaXNfYWRtaW4iOmZhbHNlLCJpYXQiOjE1NjMyOTQwNjcsImV4cCI6MTU2MzM4MDQ2N30.qohOQ7fJYJ6bz_R3TptO7FmP0MyPY6goITOvYY4hpYg',
      },

      withoutFare: {
        user_id: 1,
        is_admin: true,
        bus_id: 1,
        origin: 'Lagos',
        destination: 'Abuja',
        trip_date: getNextSevenDays(),
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZmlyc3RfbmFtZSI6IktvYmUiLCJsYXN0X25hbWUiOiJCcnlhbnQiLCJlbWFpbCI6ImtvYmVicnlhbnRAZ21haWwuY29tIiwiaXNfYWRtaW4iOmZhbHNlLCJpYXQiOjE1NjMyOTQwNjcsImV4cCI6MTU2MzM4MDQ2N30.qohOQ7fJYJ6bz_R3TptO7FmP0MyPY6goITOvYY4hpYg',
      },

      withInvalidFare: {
        user_id: 1,
        is_admin: true,
        bus_id: 1,
        origin: 'Lagos',
        destination: 'Abuja',
        trip_date: getNextSevenDays(),
        fare: '8750wjd',
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZmlyc3RfbmFtZSI6IktvYmUiLCJsYXN0X25hbWUiOiJCcnlhbnQiLCJlbWFpbCI6ImtvYmVicnlhbnRAZ21haWwuY29tIiwiaXNfYWRtaW4iOmZhbHNlLCJpYXQiOjE1NjMyOTQwNjcsImV4cCI6MTU2MzM4MDQ2N30.qohOQ7fJYJ6bz_R3TptO7FmP0MyPY6goITOvYY4hpYg',
      },

      withLesserFare: {
        user_id: 1,
        is_admin: true,
        bus_id: 1,
        origin: 'Lagos',
        destination: 'Abuja',
        trip_date: getNextSevenDays(),
        fare: 900,
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZmlyc3RfbmFtZSI6IktvYmUiLCJsYXN0X25hbWUiOiJCcnlhbnQiLCJlbWFpbCI6ImtvYmVicnlhbnRAZ21haWwuY29tIiwiaXNfYWRtaW4iOmZhbHNlLCJpYXQiOjE1NjMyOTQwNjcsImV4cCI6MTU2MzM4MDQ2N30.qohOQ7fJYJ6bz_R3TptO7FmP0MyPY6goITOvYY4hpYg',
      },

      withGreaterFare: {
        user_id: 1,
        is_admin: true,
        bus_id: 1,
        origin: 'Lagos',
        destination: 'Abuja',
        trip_date: getNextSevenDays(),
        fare: 15100,
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZmlyc3RfbmFtZSI6IktvYmUiLCJsYXN0X25hbWUiOiJCcnlhbnQiLCJlbWFpbCI6ImtvYmVicnlhbnRAZ21haWwuY29tIiwiaXNfYWRtaW4iOmZhbHNlLCJpYXQiOjE1NjMyOTQwNjcsImV4cCI6MTU2MzM4MDQ2N30.qohOQ7fJYJ6bz_R3TptO7FmP0MyPY6goITOvYY4hpYg',
      },

      withUndefinedReqHeadersAuthorization: {
        user_id: 1,
        is_admin: true,
        bus_id: 1,
        origin: 'Lagos',
        destination: 'Abuja',
        trip_date: getNextSevenDays(),
        fare: 15000,
        token: undefined,
      },

      withInvalidToken: {
        user_id: 1,
        is_admin: true,
        bus_id: 1,
        origin: 'Lagos',
        destination: 'Abuja',
        trip_date: getNextSevenDays(),
        fare: 15000,
        token: 'iLCJlbWFpbCI6ImtvYmVicnlhbnRAZ21haWwuY29tIiwiaXNfYWRtaW4iOmZhbHNlLCJpYXQiOjE1NjMyOTQwNjcsImV4cCI6MTU2MzM4MDQ2N30.qohOQ7fJYJ6bz_R3TptO7FmP0MyPY6goITOvYY4hpYgeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZmlyc3RfbmFtZSI6IktvYmUiLCJsYXN0X25hbWUiOiJCcnlhbnQ',
      },
    },
  },
};

export default trips;
