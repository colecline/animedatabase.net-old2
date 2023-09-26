import { Request, Response, NextFunction } from "express";

export const GET_USER = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		res.json(req.user);
	} catch (error) {
		next(error);
	}
};
