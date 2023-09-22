import UserService from "../UserService";
import { prismaMock } from "../../singleton";

describe("User Service", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	it("Should create a user when a unique username and email are provided", async () => {
		const mockUser = {
			id: 1,
			username: "testuser",
			email: "testuser@animedatabase.net",
			password: "12345678Aa!",
			createdAt: new Date(Date.now()),
		};

		prismaMock.user.create.mockResolvedValue(mockUser);

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
