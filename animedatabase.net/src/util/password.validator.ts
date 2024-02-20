import { z } from "zod";

export const passwordValidationSchema = z
	.string()
	.min(8, "Password must be at least 8 characters long.")
	.max(128, "Password must not exceed 128 characters.")
	.refine((password) => /[A-Z]/.test(password), "Password must contain at least one uppercase letter.")
	.refine((password) => /[a-z]/.test(password), "Password must contain at least one lowercase letter.")
	.refine((password) => /\d/.test(password), "Password must contain at least one digit.")
	.refine(
		(password) => /[!@#$%^&*(),.?":{}|<>]/.test(password),
		"Password must contain at least one special character.",
	);
