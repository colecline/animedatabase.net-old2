import UserService from "../UserService";

describe("User Service", () => {
	it("Should create a user when a unique username and email are provided", async () => {
		const user = await UserService.createUser(
			"testuser",
			"testuser@animedatabase.net",
			"12345678Aa!"
		);
		expect(typeof user.id).toBe("number");
		expect(user.username).toEqual("testuser");
		expect(user.email).toEqual("testuser@animedatabase.net");
		expect(typeof user.createdAt).toBe("object");
	});
});
