import { Request, Response, NextFunction } from "express";
import { AnimeSubmissionSchema } from "../validators/submissions.validator";
import SubmissionService from "../services/SubmissionService";
import { ApplicationError } from "../errors/ApplicationError";

export const POST_SUBMISSIONS = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	try {
		console.log("I am here!");
		const validatedSubmission = await AnimeSubmissionSchema.parse(req.body);
		console.log(validatedSubmission);
		const submission = await SubmissionService.createSubmission(49, validatedSubmission);
		res.status(201).json(submission);
	} catch (error) {
		next(error);
	}
};

export const GET_SUBMISSIONS = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	try {
		const page = parseInt(req.query.page as string) || 1;
		const limit = parseInt(req.query.limit as string) || 10;

		const offset = (page - 1) * limit;

		const submissions = await SubmissionService.getSubmissions(limit, offset);
		res.status(201).json(submissions);
	} catch (error) {
		next(error);
	}
};

export const GET_SUBMISSIONS_ID = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	try {
		const { id } = req.params;
		if (!id) {
			throw ApplicationError.badRequest("ID is required");
		}
		const submission = await SubmissionService.findSubmissionById(parseInt(id));
		res.status(200).json(submission);
	} catch (error) {
		next(error);
	}
};
