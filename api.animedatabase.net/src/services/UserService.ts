import prisma from "../database/prismaClient";
import bcrypt from "bcrypt";
import { User } from "@prisma/client";
import { ApplicationError } from "../errors/ApplicationError";

class UserService {
	async #isUsernameTaken(username: string): Promise<boolean> {
		const user = await prisma.user.findUnique({ where: { username } });
		return user ? true : false;
	}

	async #isEmailTaken(email: string): Promise<boolean> {
		const user = await prisma.user.findUnique({ where: { email } });
		return user ? true : false;
	}

	async #hashPassword(password: string): Promise<string> {
		const saltRounds = 10;
		const hashedPassword = await bcrypt.hash(password, saltRounds);
		return hashedPassword;
	}

	async createUser(
		username: string,
		email: string,
		password: string
	): Promise<Omit<User, "password">> {
		// Check if username already exists
		if (await this.#isUsernameTaken(username)) {
			throw ApplicationError.badRequest("Username already exists");
		}

		// Check if email already exists
		if (await this.#isEmailTaken(email)) {
			throw ApplicationError.badRequest("Email already exists");
		}

		const hashedPassword = await this.#hashPassword(password);

		const user = await prisma.user.create({
			data: {
				username,
				email,
				password: hashedPassword,
			},
			select: {
				id: true,
				username: true,
				email: true,
				password: false,
				createdAt: true,
			},
		});

		return user;
	}
}

export default new UserService();
