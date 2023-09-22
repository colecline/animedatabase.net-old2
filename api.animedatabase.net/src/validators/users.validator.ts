import { z } from "zod";
import { PasswordSchema } from "./password.validator";

export const CreateUserSchema = z.object({
	username: z
		.string()
		.min(2, "Username must be more than 2 characters")
		.max(16, "Username must be less than 16 characters"),
	email: z.string().email("Invalid email address"),
	password: PasswordSchema,
});
