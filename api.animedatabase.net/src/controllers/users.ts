import { Request, Response } from "express";
import UserService from "../services/UserService";

export const POSTS_USERS = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const { username, email, password } = req.body;
		const user = await UserService.createUser(username, email, password);
		res.status(201).json(user);
	} catch (error) {
		if (error instanceof Error) {
			res.status(500).json({ error: error.message });
		} else {
			res.status(500).json({ error: "Interal server error." });
		}
	}
};
