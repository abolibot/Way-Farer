const trips = {
  getAllTrips: {
    scenarios: {
      withoutToken: {
        user_id: 2,
        is_admin: false,
      },

      withInvalidTokenFormat: {
        token: '544654eyJh',
        user_id: 2,
        is_admin: false,
      },

      withoutUserId: {
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZmlyc3RfbmFtZSI6IktvYmUiLCJsYXN0X25hbWUiOiJCcnlhbnQiLCJlbWFpbCI6ImtvYmVicnlhbnRAZ21haWwuY29tIiwiaXNfYWRtaW4iOmZhbHNlLCJpYXQiOjE1NjMyOTQwNjcsImV4cCI6MTU2MzM4MDQ2N30.qohOQ7fJYJ6bz_R3TptO7FmP0MyPY6goITOvYY4hpYg',
        is_admin: false,
      },

      withInvalidUserId: {
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZmlyc3RfbmFtZSI6IktvYmUiLCJsYXN0X25hbWUiOiJCcnlhbnQiLCJlbWFpbCI6ImtvYmVicnlhbnRAZ21haWwuY29tIiwiaXNfYWRtaW4iOmZhbHNlLCJpYXQiOjE1NjMyOTQwNjcsImV4cCI6MTU2MzM4MDQ2N30.qohOQ7fJYJ6bz_R3TptO7FmP0MyPY6goITOvYY4hpYg',
        user_id: '2',
        is_admin: false,
      },

      withoutIsAdmin: {
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZmlyc3RfbmFtZSI6IktvYmUiLCJsYXN0X25hbWUiOiJCcnlhbnQiLCJlbWFpbCI6ImtvYmVicnlhbnRAZ21haWwuY29tIiwiaXNfYWRtaW4iOmZhbHNlLCJpYXQiOjE1NjMyOTQwNjcsImV4cCI6MTU2MzM4MDQ2N30.qohOQ7fJYJ6bz_R3TptO7FmP0MyPY6goITOvYY4hpYg',
        user_id: 2,
      },

      withInvalidIsAdmin: {
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZmlyc3RfbmFtZSI6IktvYmUiLCJsYXN0X25hbWUiOiJCcnlhbnQiLCJlbWFpbCI6ImtvYmVicnlhbnRAZ21haWwuY29tIiwiaXNfYWRtaW4iOmZhbHNlLCJpYXQiOjE1NjMyOTQwNjcsImV4cCI6MTU2MzM4MDQ2N30.qohOQ7fJYJ6bz_R3TptO7FmP0MyPY6goITOvYY4hpYg',
        user_id: 2,
        is_admin: 'false',
      },

      withUndefinedReqHeadersAuthorization: {
        authorization: undefined,
      },

      withUserUnauthenticated: {
        authorization: 'qohOQ7fJYJ6bz_R3TptO7FmP0MyPY6goITOvYY4hpYgeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZmlyc3RfbmFtZSI6IktvYmUiLCJsYXN0X25hbWUiOiJCcnlhbnQiLCJlbWFpbCI6ImtvYmVicnlhbnRAZ21haWwuY29tIiwiaXNfYWRtaW4iOmZhbHNlLCJpYXQiOjE1NjMyOTQwNjcsImV4cCI6MTU2MzM4MDQ2N30.',
      },

      withInvalidToken: {
        authorization: 'iLCJlbWFpbCI6ImtvYmVicnlhbnRAZ21haWwuY29tIiwiaXNfYWRtaW4iOmZhbHNlLCJpYXQiOjE1NjMyOTQwNjcsImV4cCI6MTU2MzM4MDQ2N30.qohOQ7fJYJ6bz_R3TptO7FmP0MyPY6goITOvYY4hpYgeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZmlyc3RfbmFtZSI6IktvYmUiLCJsYXN0X25hbWUiOiJCcnlhbnQ',
      },

      withUserAuthenticated: {
        authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZmlyc3RfbmFtZSI6IktvYmUiLCJsYXN0X25hbWUiOiJCcnlhbnQiLCJlbWFpbCI6ImtvYmVicnlhbnRAZ21haWwuY29tIiwiaXNfYWRtaW4iOmZhbHNlLCJpYXQiOjE1NjMyOTQwNjcsImV4cCI6MTU2MzM4MDQ2N30.qohOQ7fJYJ6bz_R3TptO7FmP0MyPY6goITOvYY4hpYg',
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZmlyc3RfbmFtZSI6IktvYmUiLCJsYXN0X25hbWUiOiJCcnlhbnQiLCJlbWFpbCI6ImtvYmVicnlhbnRAZ21haWwuY29tIiwiaXNfYWRtaW4iOmZhbHNlLCJpYXQiOjE1NjMyOTQwNjcsImV4cCI6MTU2MzM4MDQ2N30.qohOQ7fJYJ6bz_R3TptO7FmP0MyPY6goITOvYY4hpYg',
        user_id: 2,
        is_admin: false,
      },
    },
  },
};

export default trips;
