import { Request, Response, NextFunction } from "express";
import UserService from "../services/UserService";
import { User } from "@prisma/client";
import { ApplicationError } from "../errors/ApplicationError";
import sharp from "sharp";
import { v4 as uuidv4 } from "uuid";

import s3 from "../config/aws.config";

type RequestWithUser = Request & { user: User };

function assertHasUser(req: Request): asserts req is RequestWithUser {
	if (!("user" in req)) {
		throw new Error("Request object without user found unexpectedly");
	}
}

export const GET_USER = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		res.json(req.user);
	} catch (error) {
		next(error);
	}
};

export const PATCH_USER = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		assertHasUser(req);
		const userId = req.user.id;

		const updatedUser = await UserService.updateUserProfile(
			userId,
			req.body
		);
		res.json(updatedUser);
	} catch (error) {
		next(error);
	}
};

export const POST_USER_PROFILE_PICTURE = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		assertHasUser(req);
		const file = req.file;
		const user = req.user;

		if (!file) throw new ApplicationError(400, "File is missing");
		if (!user) throw new ApplicationError(401, "User is not authenticated");

		const filename = `${user.id}_${uuidv4()}.jpeg`;

		const PROFILE_PICTURE_DIMENSIONS = 400;

		const resizedImageBuffer = await sharp(file.buffer)
			.resize({
				width: PROFILE_PICTURE_DIMENSIONS,
				height: PROFILE_PICTURE_DIMENSIONS,
			})
			.toFormat("jpeg")
			.jpeg({
				quality: 100,
				chromaSubsampling: "4:4:4",
				force: true,
			})
			.toBuffer();

		const uploadParams = {
			Bucket: process.env.AWS_S3_BUCKET_NAME as string,
			Key: `avatars/${filename}`,
			Body: resizedImageBuffer,
			ContentType: file.mimetype,
		};

		const uploadResponse = await s3.upload(uploadParams).promise();
		const imageUrl = uploadResponse.Location;

		// associate image url with database user

		await UserService.updateProfilePicture(user.id, filename);

		res.status(200).json({ imageUrl });
	} catch (error) {
		next(error);
	}
};
