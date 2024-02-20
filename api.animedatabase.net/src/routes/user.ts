import express from "express";
import * as UserController from "../controllers/user";
import { Request, Response, NextFunction } from "express";
import { ApplicationError } from "../errors/ApplicationError";
import multer from "multer";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/", isAuthenticated, UserController.GET_USER);
router.patch("/", isAuthenticated, UserController.PATCH_USER);
router.post(
	"/avatar",
	isAuthenticated,
	upload.single("image"),
	UserController.POST_USER_PROFILE_PICTURE
);

function isAuthenticated(req: Request, res: Response, next: NextFunction) {
	if (req.isAuthenticated()) return next();
	throw new ApplicationError(401, "Not Authenticated");
}

export default router;
