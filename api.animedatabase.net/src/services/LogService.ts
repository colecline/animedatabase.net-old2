import prisma from "../database/prismaClient";
import { ApplicationError } from "../errors/ApplicationError";

class LogService {
	async createSubmissionCreatedLog(submissionId: number, userId: number) {
		try {
			const log = await prisma.log.create({
				data: {
					submissionId: submissionId,
					userId: userId,
					actionType: "SUBMISSION_CREATED",
					details: "Submission created.",
				},
			});
		} catch (error) {
			throw ApplicationError.internal("Something went wrong!");
		}
	}

	async createSubmissionStatusChangedLog() {}
	async createSubmissionCommentLog() {}
	async createActionCreatedLog() {}
	async createActionStatusChangedLog() {}
	async createActionEditedLog() {}
}

export default new LogService();
