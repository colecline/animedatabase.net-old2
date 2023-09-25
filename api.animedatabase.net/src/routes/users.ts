import express from "express";
import * as UsersController from "../controllers/users";
import { validate } from "../middlewares/Validator";
import { CreateUserSchema } from "../validators/users.validator";

const router = express.Router();

router.post("/", validate(CreateUserSchema), UsersController.POSTS_USERS);
router.post("/login", UsersController.POST_USERS_LOGIN);

export default router;
