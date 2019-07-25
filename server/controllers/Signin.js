/* eslint-disable consistent-return */
/* eslint-disable camelCase */
import bcrypt from 'bcrypt';
import { query } from '../db/index';
import 'dotenv/config';
import generateToken from '../helpers/tokenGeneration';
import userModel from '../models/Users';

const signinController = async (req, res) => {
  const { findUserByEmail } = userModel;
  const queryText = findUserByEmail;
  const value = [req.value.body.email];

  try {
    const { rows } = await query(queryText, value);
    const user = rows[0];

    if (!user) return res.status(400).json({ status: 400, error: 'invalid login details' });

    const match = await bcrypt.compare(req.value.body.password, user.password);

    if (match) {
      const token = generateToken(user);
      const output = {
        user_id: user.id,
        is_admin: user.is_admin,
        token,
      };
      return res.status(200).json({ status: 200, message: 'user signin successful', data: output });
    }
    return res.status(400).json({ status: 409, error: 'invalid login details' });
  } catch (error) {
    return res.status(500).json({ status: 500, error });
  }
};

export default signinController;
