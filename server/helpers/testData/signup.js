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

    user: {
      email: 'alarantobiloba@gmail.com',
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

    withValidDetails: {
      email: 'testU@gmail.com',
      password: 'pass4321',
      firstName: 'Test',
      lastName: 'User',
    },
  },
};

export default signup;
