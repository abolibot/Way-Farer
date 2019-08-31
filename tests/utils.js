/* eslint-disable func-names */
/* eslint-disable object-shorthand */
const utils = {
  res: {
    status: () => {},
    json: () => {},
  },
  mockRequest: (userData) => {
    const req = {
      value: {
        body: userData,
      },
    };
    return req;
  },
  mockUser: () => {
    const user = {
      id: 1,
      email: 'testU@gmail.com',
      password: 'pass4321',
      firstName: 'Test',
      lastName: 'User',
      is_admin: true,
    };
    return user;
  },
};

export default utils;
