import { query } from '../db/index';
import userModel from '../models/Users';

const checkIfEmailExists = async (req, res, next) => {
  const { findUserByEmail } = userModel;
  const queryText = findUserByEmail;
  const value = [req.value.body.email.toLowerCase()];
  try {
    const { rows } = await query(queryText, value);
    const user = rows[0];

    if (user) return res.status(409).json({ status: 409, error: 'User with EMAIL already exist' });

    return next();
  } catch (error) {
    return res.status(500).json({ status: 500, error });
  }
};

export default checkIfEmailExists;
