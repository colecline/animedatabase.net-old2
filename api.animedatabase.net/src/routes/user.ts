import express from "express";
import * as UserController from "../controllers/user";
import { Request, Response, NextFunction } from "express";
import { ApplicationError } from "../errors/ApplicationError";

const router = express.Router();

router.get("/", isAuthenticated, UserController.GET_USER);

function isAuthenticated(req: Request, res: Response, next: NextFunction) {
	if (req.isAuthenticated()) return next();
	throw new ApplicationError(401, "Not Authenticated");
}

export default router;
