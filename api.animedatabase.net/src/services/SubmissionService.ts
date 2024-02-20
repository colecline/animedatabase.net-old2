import { Submission } from "@prisma/client";
import prisma from "../database/prismaClient";
import { ApplicationError } from "../errors/ApplicationError";

interface ActionInput {
	target: string;
	targetField: string;
	content: string;
}

interface SubmissionInput {
	actions: ActionInput[];
}

class SubmissionService {
	async createSubmission(
		userId: number,
		input: SubmissionInput
	): Promise<Submission> {
		const { actions } = input;

		const submission = await prisma.submission.create({
			data: {
				type: "ADD_ANIME",
				status: "pending",
				user: { connect: { id: userId } },
				actions: {
					create: actions.map((action) => ({ ...action, userId })),
				},
				logs: {
					create: {
						actionType: "SUBMISSION_CREATED",
						userId: userId,
						details: "Created submission",
					},
				},
			},
			include: {
				actions: true,
				logs: true,
			},
		});

		return submission;
	}

	async getSubmissions(limit: number, offset: number): Promise<Submission[]> {
		try {
			const submissions = await prisma.submission.findMany({
				skip: offset,
				take: limit,
				include: {
					actions: false,
					logs: false,
					user: {
						select: {
							id: true,
							username: true,
							email: false,
							password: false,
							role: false,
							displayName: true,
							profilePicture: true,
							bio: false,
							location: false,
							website: false,
							isVerified: true,
							experiencePoints: false,
							followersCount: false,
							followingCount: false,
							createdAt: false,
						},
					},
				},
			});
			return submissions;
		} catch (error) {
			throw ApplicationError.internal("Something went wrong");
		}
	}

	async findSubmissionById(id: number): Promise<Submission> {
		const submission = await prisma.submission.findUnique({
			where: { id },
			include: {
				actions: true,
				logs: true,
				user: {
					select: {
						id: true,
						username: true,
						email: false,
						password: false,
						role: false,
						displayName: true,
						profilePicture: true,
						bio: false,
						location: false,
						website: false,
						isVerified: true,
						experiencePoints: false,
						followersCount: false,
						followingCount: false,
						createdAt: false,
					},
				},
			},
		});
		if (!submission) {
			throw new ApplicationError(404, "Submission not found");
		}
		return submission;
	}
}

export default new SubmissionService();
