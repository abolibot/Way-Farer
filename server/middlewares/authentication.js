/* eslint-disable camelcase */
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import userModel from '../models/Users';

const authentication = {
  verifyToken: async (req, res, next) => {
    try {
      const authData = jwt.verify(req.token, process.env.JWT_SECRET_KEY);
      const user = await userModel.findUserByEmail(authData.email);
      if (user.error) return res.status(500).json({ status: 500, error: user.error });
      if ((!user) || (user.id !== req.value.body.user_id) || (user.is_admin !== req.value.body.is_admin)) return res.status(401).json({ status: 401, error: 'invalid token' });
      req.user = user;
      return next();
    } catch (error) {
      return res.status(500).json({ status: 500, error });
    }
  },

  generateToken: (user) => {
    const {
      id, first_name, last_name, email, is_admin,
    } = user;
    const token = jwt.sign({
      id, first_name, last_name, email, is_admin,
    }, process.env.JWT_SECRET_KEY, { expiresIn: '86400s' });
    return token;
  },

  getToken: (req, res, next) => {
    const bearerHeader = req.headers.authorization;
    if (typeof bearerHeader !== 'undefined') {
      const bearer = bearerHeader.split(' ');
      const bearerToken = bearer[1];
      req.token = bearerToken;
      return next();
    } return res.status(401).json({ status: 401, error: 'You need a token to access this route' });
  },

  isUserAdmin: (req, res, next) => {
    const { user } = req;
    if (user.is_admin === false) {
      return res.status(401).json({ status: 401, error: 'You do not have permissions to access this endpoint' });
    }
    return next();
  },
};

export default authentication;
