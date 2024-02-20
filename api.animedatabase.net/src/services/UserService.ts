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

	async #omitPasswordFromUser(user: User): Promise<Omit<User, "password">> {
		const { password, ...userWithoutPassword } = user;
		return userWithoutPassword;
	}

	async #omitEmailAndPasswordFromUser(
		user: User
	): Promise<Omit<User, "email" | "password">> {
		const { email, ...userWithoutEmail } = user;
		const { password, ...userWithoutEmailAndPassword } = userWithoutEmail;
		return userWithoutEmailAndPassword;
	}

	async #hashPassword(password: string): Promise<string> {
		const saltRounds = 10;
		const hashedPassword = await bcrypt.hash(password, saltRounds);
		return hashedPassword;
	}

	async #sanitizeUpdateInput(input: any): Promise<any> {
		const allowedUpdateFields = [
			"displayName",
			"profilePicture",
			"bio",
			"location",
			"website",
		];

		const sanitizedInput: any = {};
		for (const field of allowedUpdateFields) {
			if (field in input) {
				sanitizedInput[field] = input[field];
			}
		}

		console.log("Sanitized Input: ", sanitizedInput);
		return sanitizedInput;
	}

	async #comparePasswords(
		password: string,
		hashedPassword: string
	): Promise<boolean> {
		try {
			const match = await bcrypt.compare(password, hashedPassword);
			if (!match) {
				return false;
			}
			return true;
		} catch (err) {
			throw ApplicationError.internal("Something went wrong");
		}
	}

	async #authenticateUser(user: User, password: string): Promise<boolean> {
		const result = await this.#comparePasswords(password, user.password);
		return result ? true : false;
	}

	async createUser(
		username: string,
		email: string,
		password: string
	): Promise<Omit<User, "password">> {
		if (await this.#isUsernameTaken(username)) {
			throw ApplicationError.badRequest("Username already exists");
		}

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
				role: true,
				displayName: true,
				profilePicture: true,
				bio: true,
				location: true,
				website: true,
				isVerified: true,
				experiencePoints: true,
				followersCount: true,
				followingCount: true,
				createdAt: true,
			},
		});

		return user;
	}

	async loginUser(
		username: string,
		password: string
	): Promise<Omit<User, "password">> {
		const user = await prisma.user.findUnique({ where: { username } });
		if (!user) {
			throw ApplicationError.badRequest("Incorrect username");
		}

		const isAuthenticated = await this.#authenticateUser(user, password);
		if (!isAuthenticated) {
			throw ApplicationError.badRequest("Incorrect password");
		}
		return await this.#omitPasswordFromUser(user);
	}

	async findUserById(id: number): Promise<Omit<User, "password">> {
		const user = await prisma.user.findUnique({ where: { id } });
		if (!user) {
			throw new ApplicationError(404, "User not found");
		}
		return await this.#omitPasswordFromUser(user);
	}

	async findUserByUsername(
		username: string
	): Promise<Omit<User, "password" | "email">> {
		const user = await prisma.user.findUnique({ where: { username } });
		if (!user) {
			throw new ApplicationError(404, "User not found");
		}
		return await this.#omitEmailAndPasswordFromUser(user);
	}

	async updateUserProfile(
		userId: number,
		updates: Partial<User>
	): Promise<Omit<User, "password">> {
		const sanitizedUpdatedUserInput = await this.#sanitizeUpdateInput(
			updates
		);
		const updatedUser = await prisma.user.update({
			where: { id: userId },
			data: sanitizedUpdatedUserInput,
			select: {
				id: true,
				username: true,
				email: true,
				password: false,
				role: true,
				displayName: true,
				profilePicture: true,
				bio: true,
				location: true,
				website: true,
				isVerified: true,
				experiencePoints: true,
				followersCount: true,
				followingCount: true,
				createdAt: true,
			},
		});
		if (!updatedUser) throw ApplicationError.notFound("User not found");
		console.log("Updated User: ", updatedUser);
		return updatedUser;
	}

	async updateProfilePicture(
		userId: number,
		newImageUrl: string
	): Promise<Omit<User, "email" | "password">> {
		const user = await prisma.user.update({
			where: { id: userId },
			data: {
				profilePicture: newImageUrl,
			},
			select: {
				id: true,
				username: true,
				email: false,
				password: false,
				role: true,
				displayName: true,
				profilePicture: true,
				bio: true,
				location: true,
				website: true,
				isVerified: true,
				experiencePoints: true,
				followersCount: true,
				followingCount: true,
				createdAt: true,
			},
		});
		return user;
	}
}

export default new UserService();
