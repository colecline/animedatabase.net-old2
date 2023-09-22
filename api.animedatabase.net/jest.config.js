module.exports = {
	preset: "ts-jest",
	testEnvironment: "node",
	moduleFileExtensions: ["ts", "js"],
	transform: {
		"^.+\\.(ts|tsx)$": [
			"ts-jest",
			{
				/* ts-jest config goes here */
			},
		],
	},
	testMatch: ["**/__tests__/**/*.ts", "**/?(*.)+(spec|test).ts"],
};
