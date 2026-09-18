import { v4 } from "uuid";
import bcrypt from "bcrypt";
import * as Yup from "yup";
import User from "../models/User.js";

class UserController {
  async store(request, response) {
    const normalizedBody = {
      ...request.body,
      admin: request.body.admin === "true" || request.body.admin === true,
    };

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().min(6).required(),
      admin: Yup.boolean().required(),
    });

    try {
      await schema.validate(normalizedBody, { abortEarly: false, strict: true });
    } catch (err) {
      return response.status(400).json({
        error: "Validation failed",
        messages: err.errors,
      });
    }

    const { name, email, password, admin } = normalizedBody;

    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return response.status(400).json({ error: "Email already in use" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({
      id: v4(),
      name,
      email,
      password_hash: passwordHash,
      admin,
    });

    const userResponse = {
      id: user.id,
      name: user.name,
      email: user.email,
      admin: user.admin,
    };

    return response.status(201).json(userResponse);
  }
}

export default new UserController();
