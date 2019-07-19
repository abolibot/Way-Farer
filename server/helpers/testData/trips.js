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
};

export default trips;
