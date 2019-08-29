import bcrypt from 'bcrypt';
import authentication from '../middlewares/authentication';
import userModel from '../models/Users';

const authController = {
  signup: async (req, res) => {
    const emailAlreadyInUse = await userModel.emailInUse(req.value.body.email);
    if (emailAlreadyInUse.error) {
      const { error } = emailAlreadyInUse;
      return res.status(500).json({ status: 500, error });
    }
    if (emailAlreadyInUse === true) return res.status(409).json({ status: 409, error: 'User with EMAIL already exist' });

    const createdUser = await userModel.createUser(req.value.body);
    if (createdUser.error) {
      const { error } = createdUser;
      return res.status(500).json({ status: 500, error });
    }
    const token = authentication.generateToken(createdUser);
    const output = {
      user_id: createdUser.id,
      is_admin: createdUser.is_admin,
      token,
    };
    return res.status(201).json({ status: 201, message: 'user created successfully', data: output });
  },

  signin: async (req, res) => {
    const user = await userModel.findUserByEmail(req.value.body.email);
    if (user === null) return res.status(400).json({ status: 400, error: 'invalid login details' });
    if (user.error) return res.status(500).json({ status: 500, error: user.error });

    const match = await bcrypt.compare(req.value.body.password, user.password);
    if (match) {
      const token = authentication.generateToken(user);
      const output = {
        user_id: user.id,
        is_admin: user.is_admin,
        token,
      };
      return res.status(200).json({ status: 200, message: 'user signin successful', data: output });
    }
    return res.status(400).json({ status: 400, error: 'invalid login details' });
  },
};

export default authController;
