import { z } from "zod";
import { passwordValidationSchema } from "./password.validator";

export const stepOneUserValidationSchema = z.object({
	username: z
		.string()
		.min(2, "Username must be more than 2 characters")
		.max(16, "Username must be less than 16 characters"),
});

export const stepTwoUserValidationSchema = z.object({
	email: z.string().email("Invalid email address"),
	password: passwordValidationSchema,
	terms: z
		.boolean()
		.refine(
			(value) => value === true,
			"You must agree to the terms of service"
		),
});

export const loginValidationSchema = z.object({
	username: z.string(),
	password: z.string(),
});
