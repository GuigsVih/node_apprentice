import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

interface TokenPayload {
	id: string,
	iat: string,
	exp: string
}
export default function AuthMiddleware(
	request: Request, 
	response: Response, 
	next: NextFunction
	) {
		const env = require('dotenv').config();
		const { authorization } = request.headers;
		if (!authorization) {
			return response.sendStatus(401);
		}
		const token = authorization.replace('Bearer', '').trim();
		try {
			const data = jwt.verify('token', env.parsed.SECRET_KEY);
			const { id } = data as TokenPayload;
			request.userId = id;
			return next();
		} catch {
			return response.sendStatus(401);
		}
}