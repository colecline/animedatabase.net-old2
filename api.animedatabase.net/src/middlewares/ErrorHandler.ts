import express, { Request, Response, NextFunction } from "express";
import { ApplicationError } from "../errors/ApplicationError";

export default function ErrorHandler(
	err: any, // temp fix, was ApplicationError
	req: Request,
	res: Response,
	next: NextFunction
): void {
	// log the error! temp logging solution
	// don't use in prod, not async!
	console.error(err);

	if (err instanceof ApplicationError) {
		res.status(err.statusCode).json(err.message);
		return;
	}

	if (err.name === "AuthenticationError") {
		res.status(401).json(err.message);
		return;
	}

	res.status(500).json("Internal server error.");
}
