const signin = {
  scenarios: {
    withoutEmail: {
      password: 'pass4321',
    },

    withInvalidEmail: {
      email: 'fssagfds.dsfd',
      password: 'pass4321',
    },

    withoutPassword: {
      email: 'user@gmail.com',
    },

    withInvalidPassword: {
      email: 'user@gmail.com',
      password: '12345',
    },

    emailDoesnotExist: {
      email: 'nonexistinguser@gmail.com',
      password: 'password',
    },

    withIncorrectPassword: {
      email: 'user@gmail.com',
      password: 'password',
    },

    withValidDetails: {
      email: 'testU@gmail.com',
      password: 'pass4321',
    },

    user: {
      email: 'user@gmail.com',
      password: 'pass4321',
      firstName: 'Existing',
      lastName: 'User',
    },
  },

  users: [
    {
      email: 'user@gmail.com',
      password: 'pass4321',
      firstName: 'Existing',
      lastName: 'User',
    },
  ],
};

export default signin;
