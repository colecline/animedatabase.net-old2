import { Request, Response, NextFunction } from "express";
import UserService from "../services/UserService";

export const POSTS_USERS = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const { username, email, password } = req.body;
		const user = await UserService.createUser(username, email, password);
		res.status(201).json(user);
	} catch (error) {
		next(error);
	}
};
