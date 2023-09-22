export class ApplicationError {
	constructor(public statusCode: number, public message: string) {
		this.statusCode = statusCode;
		this.message = message;
	}

	static badRequest(msg: string) {
		return new ApplicationError(400, msg);
	}

	static notFound(msg: string) {
		return new ApplicationError(404, msg);
	}

	static internal(msg: string) {
		return new ApplicationError(500, msg);
	}
}
