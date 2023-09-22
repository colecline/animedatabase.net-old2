import prisma from "../database/prismaClient";
import { User } from "@prisma/client";

class UserService {
	async createUser(
		username: string,
		email: string,
		password: string
	): Promise<Omit<User, "password">> {
		// TODO: check if username is taken
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
