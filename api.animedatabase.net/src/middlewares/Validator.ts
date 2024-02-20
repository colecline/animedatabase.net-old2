import { Request, Response, NextFunction } from "express";
import { ZodType, ZodError } from "zod";
import { ApplicationError } from "../errors/ApplicationError";

export const validate = (schema: ZodType<any, any>) => {
	return (req: Request, res: Response, next: NextFunction) => {
		try {
			schema.parse(req.body);
			next();
		} catch (error) {
			if (error instanceof ZodError) {
				// grabs the first validation error message instead of all of them
				// it might not be good to return one error at a time but
				// i will revisit this later if it is an issue
				console.log(error.errors);
				next(ApplicationError.badRequest(error.errors[0].message));
			} else {
				next(error);
			}
		}
	};
};
