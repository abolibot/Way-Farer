/* eslint-disable max-len */
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const generateToken = (row) => {
  const token = jwt.sign({
    id: row.id, first_name: row.first_name, last_name: row.last_name, email: row.email, is_admin: row.is_admin,
  }, process.env.JWT_SECRET_KEY, { expiresIn: '86400s' });
  return token;
};

export default generateToken;
