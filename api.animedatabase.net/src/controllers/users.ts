import { Request, Response, NextFunction } from "express";
import UserService from "../services/UserService";
import session from "express-session";
import passport = require("passport");
import { ApplicationError } from "../errors/ApplicationError";
import { User } from "@prisma/client";

export const POSTS_USERS = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	try {
		const { username, email, password } = req.body;
		const user = await UserService.createUser(username, email, password);
		res.status(201).json(user);
	} catch (error) {
		next(error);
	}
};

export const POST_USERS_LOGIN = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	passport.authenticate("local", (err: any, user: User) => {
		if (err) {
			return next(err);
		}
		if (!user) {
			return next(ApplicationError.badRequest("Invalid username or password"));
		}
		req.logIn(user, (err) => {
			if (err) {
				return next(err);
			}
			return res.status(200).json(user);
		});
	})(req, res, next);
};

export const POST_USERS_LOGOUT = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	console.log(req.cookies);
	res.clearCookie("sessionId");
	req.logout(function (err) {
		if (err) next(err);

		req.session.destroy(function (err) {
			res.status(200).json("You are now logged out");
		});
	});
};

export const GET_USERS = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	try {
		const { username } = req.params;
		if (!username) {
			throw ApplicationError.badRequest("Username is required");
		}
		const user = await UserService.findUserByUsername(username);
		res.status(200).json(user);
	} catch (error) {
		next(error);
	}
};
