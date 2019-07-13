const signup = {
  scenarios: {
    withoutEmail: {
      email: '',
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
      password: '',
      firstNamae: 'Oluwatobi',
      lastName: 'Alaran',
    },

    withInvalidPassword: {
      email: 'alarantobiloba@gmail.com',
      password: '12345',
      firstNamae: 'Oluwatobi',
      lastName: 'Alaran',
    },

    withoutFirstName: {
      email: 'alarantobiloba@gmail.com',
      password: 'pass4321',
      firstNamae: '',
      lastName: 'Alaran',
    },

    withInvalidFirstName: {
      email: 'alarantobiloba@gmail.com',
      password: 'pass4321',
      firstNamae: '12ore',
      lastName: 'Alaran',
    },

    withoutLastName: {
      email: 'alarantobiloba@gmail.com',
      password: 'pass4321',
      firstNamae: 'Oluwatobi',
      lastName: '',
    },

    withInvalidLastName: {
      email: 'alarantobiloba@gmail.com',
      password: 'pass4321',
      firstNamae: 'Oluwatobi',
      lastName: '4frx fr7',
    },

    withExistingDetails: {
      email: 'existinguser@gmail.com',
      password: 'password1',
      firstNamae: 'existing',
      lastName: 'user',
    },

    withValidDetails: {
      email: 'alarantobiloba@gmail.com',
      password: 'pass4321',
      firstNamae: 'Oluwatobi',
      lastName: 'Alaran',
    },
  },

  reset: () => {
    this.scenarios = {
      withoutEmail: {
        email: '',
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
        password: '',
        firstNamae: 'Oluwatobi',
        lastName: 'Alaran',
      },

      withInvalidPassword: {
        email: 'alarantobiloba@gmail.com',
        password: '12345',
        firstNamae: 'Oluwatobi',
        lastName: 'Alaran',
      },

      withoutFirstName: {
        email: 'alarantobiloba@gmail.com',
        password: 'pass4321',
        firstNamae: '',
        lastName: 'Alaran',
      },

      withInvalidFirstName: {
        email: 'alarantobiloba@gmail.com',
        password: 'pass4321',
        firstNamae: '12ore',
        lastName: 'Alaran',
      },

      withoutLastName: {
        email: 'alarantobiloba@gmail.com',
        password: 'pass4321',
        firstNamae: 'Oluwatobi',
        lastName: '',
      },

      withInvalidLastName: {
        email: 'alarantobiloba@gmail.com',
        password: 'pass4321',
        firstNamae: 'Oluwatobi',
        lastName: '4frx fr7',
      },

      withExistingDetails: {
        email: 'existinguser@gmail.com',
        password: 'password1',
        firstNamae: 'existing',
        lastName: 'user',
      },

      withValidDetails: {
        email: 'alarantobiloba@gmail.com',
        password: 'pass4321',
        firstNamae: 'Oluwatobi',
        lastName: 'Alaran',
      },
    };
  },
};

export default signup;
