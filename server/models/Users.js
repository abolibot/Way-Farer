import hashPassword from '../helpers/passwordEncryption';
import { query } from '../db/index';

const findUserByEmailQuery = `
  SELECT * FROM
    users WHERE email = $1
  `;

const userModel = {
  createUser: async (newUser) => {
    const queryText = `
    INSERT INTO
      users(
        first_name, last_name, email, is_admin, password)
      VALUES($1, $2, $3, $4, $5)
      returning *
    `;
    const hashedPassword = await hashPassword(newUser.password, 10);
    const values = [
      newUser.firstName,
      newUser.lastName,
      newUser.email.toLowerCase(),
      false,
      hashedPassword,
    ];

    try {
      const { rows } = await query(queryText, values);
      const createdUser = rows[0];
      return createdUser;
    } catch (error) {
      return { error };
    }
  },

  emailInUse: async (email) => {
    const queryText = findUserByEmailQuery;
    const value = [email.toLowerCase()];
    try {
      const { rows } = await query(queryText, value);
      const user = rows[0];
      if (user) return true;
      return false;
    } catch (error) {
      return { error };
    }
  },

  findUserByEmail: async (email) => {
    const queryText = findUserByEmailQuery;
    const value = [email.toLowerCase()];
    try {
      const { rows } = await query(queryText, value);
      const user = rows[0];
      if (user) return user;
      return null;
    } catch (error) {
      return { error };
    }
  },
};

export default userModel;
