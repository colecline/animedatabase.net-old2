import { Request } from "express";

export interface IUser {
	id: number;
	username: string;
	email: string;
	role: string;
}

export interface IAuthRequest extends Request {
	user: IUser;
}
