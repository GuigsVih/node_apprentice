import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import User from '../../models/User';

class UserController {
	async store(request: Request, response: Response) {
		try {
			const repository = getRepository(User);
			const { name, email, password } = request.body;
			const userExists = await repository.findOne({ where: { email } });
			if (userExists) {
				return response.status(409).json('Usuário já cadastrado');
			}
			const user = repository.create({name, email, password});
			await repository.save(user);
			return response.status(201).json('Usuário criado com sucesso');
		} catch (e) {
			return response.status(406).json('Erro ao cadastrar usuário');
		}
	}
}

export default new UserController();