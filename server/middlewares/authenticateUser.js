import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { query } from '../db/index';
import userModel from '../models/Users';

const authenticateUser = async (req, res, next) => {
  const { findUserByEmail } = userModel;
  const queryText = findUserByEmail;
  try {
    const authData = jwt.verify(req.token, process.env.JWT_SECRET_KEY);
    const value = [authData.email];
    const { rows } = await query(queryText, value);
    const user = rows[0];
    if ((!user) || (user.id !== req.value.body.user_id) || (user.is_admin !== req.value.body.is_admin)) return res.status(401).json({ status: 401, error: 'invalid token' });
    req.user = user;
    return next();
  } catch (error) {
    return res.status(500).json({ status: 500, error });
  }
};

export default authenticateUser;
