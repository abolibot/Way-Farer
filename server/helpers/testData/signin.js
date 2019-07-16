const signin = {
  scenarios: {
    withoutEmail: {
      password: 'pass4321',
      firstNamae: 'Existing',
      lastName: 'User',
    },

    withInvalidEmail: {
      email: 'fssagfds.dsfd',
      password: 'pass4321',
      firstNamae: 'Existing',
      lastName: 'User',
    },

    withoutPassword: {
      email: 'user@gmail.com',
      firstName: 'Existing',
      lastName: 'User',
    },

    withInvalidPassword: {
      email: 'user@gmail.com',
      password: '12345',
      firstName: 'Existing',
      lastName: 'User',
    },

    emailDoesnotExist: {
      email: 'nonexistinguser@gmail.com',
      password: 'password',
      firstName: 'Existing',
      lastName: 'User',
    },

    withIncorrectPassword: {
      email: 'user@gmail.com',
      password: 'password',
      firstName: 'Existing',
      lastName: 'User',
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
