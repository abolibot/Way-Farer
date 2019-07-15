const signup = {
  scenarios: {
    withoutEmail: {
      password: 'pass4321',
      firstNamae: 'Oluwatobi',
      lastName: 'Alaran',
    },

    withInvalidEmail: {
      email: 'fssagfds.dsfd',
      password: 'pass4321',
      firstNamae: 'Oluwatobi',
      lastName: 'Alaran',
    },

    withoutPassword: {
      email: 'alarantobiloba@gmail.com',
      firstName: 'Oluwatobi',
      lastName: 'Alaran',
    },

    withInvalidPassword: {
      email: 'alarantobiloba@gmail.com',
      password: '12345',
      firstName: 'Oluwatobi',
      lastName: 'Alaran',
    },

    withoutFirstName: {
      email: 'alarantobiloba@gmail.com',
      password: 'pass4321',
      lastName: 'Alaran',
    },

    withInvalidFirstName: {
      email: 'alarantobiloba@gmail.com',
      password: 'pass4321',
      firstName: '12ore',
      lastName: 'Alaran',
    },

    withoutLastName: {
      email: 'alarantobiloba@gmail.com',
      password: 'pass4321',
      firstName: 'Oluwatobi',
    },

    withInvalidLastName: {
      email: 'alarantobiloba@gmail.com',
      password: 'pass4321',
      firstName: 'Oluwatobi',
      lastName: '4frx fr7',
    },

    withValidDetails: {
      email: 'testUser@gmail.com',
      password: 'pass4321',
      firstName: 'Test',
      lastName: 'User',
    },

    user: {
      email: 'existingUser@gmail.com',
      password: 'pass4321',
      firstName: 'Existing',
      lastName: 'User',
    },

    withExistingDetails: {
      email: 'existingUser@gmail.com',
      password: 'pass4321',
      firstName: 'Existing',
      lastName: 'User',
    },
  },

  reset: () => {
    this.scenarios = {
      withoutEmail: {
        email: '',
        password: 'pass4321',
        firstName: 'Oluwatobi',
        lastName: 'Alaran',
      },

      withInvalidEmail: {
        email: 'fssagfds.dsfd',
        password: 'pass4321',
        firstName: 'Oluwatobi',
        lastName: 'Alaran',
      },

      withoutPassword: {
        email: 'alarantobiloba@gmail.com',
        password: '',
        firstName: 'Oluwatobi',
        lastName: 'Alaran',
      },

      withInvalidPassword: {
        email: 'alarantobiloba@gmail.com',
        password: '12345',
        firstName: 'Oluwatobi',
        lastName: 'Alaran',
      },

      withoutFirstName: {
        email: 'alarantobiloba@gmail.com',
        password: 'pass4321',
        firstName: '',
        lastName: 'Alaran',
      },

      withInvalidFirstName: {
        email: 'alarantobiloba@gmail.com',
        password: 'pass4321',
        firstName: '12ore',
        lastName: 'Alaran',
      },

      withoutLastName: {
        email: 'alarantobiloba@gmail.com',
        password: 'pass4321',
        firstName: 'Oluwatobi',
        lastName: '',
      },

      withInvalidLastName: {
        email: 'alarantobiloba@gmail.com',
        password: 'pass4321',
        firstName: 'Oluwatobi',
        lastName: '4frx fr7',
      },

      withExistingDetails: {
        email: 'existinguser@gmail.com',
        password: 'password1',
        firstName: 'existing',
        lastName: 'user',
      },

      withValidDetails: {
        email: 'testUser@gmail.com',
        password: 'pass4321',
        firstName: 'Test',
        lastName: 'User',
      },
    };
  },
};

export default signup;
