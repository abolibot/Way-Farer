/* eslint-disable consistent-return */
/* eslint-disable camelCase */
import { query } from '../db/index';
import 'dotenv/config';
import hashPassword from '../helpers/passwordEncryption';
import generateToken from '../helpers/tokenGeneration';
import userModel from '../models/Users';

const signup = async (req, res) => {
  const { createUser } = userModel;
  const queryText = createUser;
  const hashedPassword = await hashPassword(req.value.body.password, 10);
  const values = [
    req.value.body.firstName,
    req.value.body.lastName,
    req.value.body.email.toLowerCase(),
    false,
    hashedPassword,
  ];

  try {
    const { rows } = await query(queryText, values);
    // const user = rows[0];
    const token = generateToken(rows[0]);
    const output = {
      user_id: rows[0].id,
      is_admin: rows[0].is_admin,
      token,
    };
    return res.status(201).json({ status: 201, message: 'user created successfully', data: output });
  } catch (error) {
    return res.status(500).json({ status: 500, error });
  }
};

export default signup;
