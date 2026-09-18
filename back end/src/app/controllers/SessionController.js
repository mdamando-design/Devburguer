import bcrypt from 'bcrypt';
import * as Yup from 'yup';
import { Op } from 'sequelize';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import authConfig from './../../config/auth.js'


class SessionController {
  async store(request, response) {
    const normalizedBody = {
      ...request.body,
      email: typeof request.body.email === 'string'
        ? request.body.email.trim()
        : request.body.email,
    };

    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().min(6).required(),
    });

    try {
      await schema.validate(normalizedBody, { abortEarly: false });
    } catch (err) {
      return response.status(400).json({
        error: 'Validation failed',
        messages: err.errors,
      });
    }

    const { email, password } = normalizedBody;

    const user = await User.findOne({
      where: { email: { [Op.iLike]: email.trim() } },
    });
    if (!user) {
      return response.status(401).json({ error: 'Invalid credentials' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password_hash);
    if (!passwordMatch) {
      return response.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, admin: user.admin, name:user.name },
      process.env.JWT_SECRET || authConfig.secret,
      { expiresIn: authConfig.expiresIn, }
    );

    return response.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email,
      admin: user.admin,
      token,

    });
  }
}

export default new SessionController();
