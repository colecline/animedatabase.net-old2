import prisma from "../database/prismaClient";
import { User } from "@prisma/client";
import { ApplicationError } from "../errors/ApplicationError";

class UserService {
	async #isUsernameTaken(username: string): Promise<boolean> {
		const user = await prisma.user.findUnique({ where: { username } });
		return user ? true : false;
	}

	async createUser(
		username: string,
		email: string,
		password: string
	): Promise<Omit<User, "password">> {
		if (await this.#isUsernameTaken(username)) {
			throw ApplicationError.badRequest("Username already exists");
		}

		// TODO: check if email is taken
		// TODO: validate password
		// TODO: hash password
		const user = await prisma.user.create({
			data: {
				username,
				email,
				password,
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