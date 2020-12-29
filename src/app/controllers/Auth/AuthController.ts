import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import bcrypt from 'bcryptjs';
import User from '../../models/User';
import jwt from 'jsonwebtoken';
const env = require('dotenv').config();

class AuthController {

	async authenticate(request: Request, response: Response) {
		const repository = getRepository(User);
		const { email, password } = request.body;
		const user = await repository.findOne({ where: { email } });
		if (!user) {
			return response.status(401).json('E-mail e/ou senha incorretos');
		}
		const isValid = bcrypt.compare(password, user.password);
		if (!isValid) {
			return response.status(401).json('E-mail e/ou senha incorretos');
		}
		const token = jwt.sign({ id: user.id }, env.parsed.SECRET_KEY, { expiresIn: '1d' });
		delete user.password;
		return response.status(201).json({ user, token });
	}
}

export default new AuthController();