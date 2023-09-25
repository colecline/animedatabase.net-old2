import { createClient } from "redis";

const REDIS_HOST = process.env.REDIS_HOST || "localhost";
const REDIS_PORT = process.env.REDIS_PORT
	? parseInt(process.env.REDIS_PORT)
	: 6379;
const REDIS_PASSWORD = process.env.REDIS_PASSWORD || "";

const redisClient = createClient({
	socket: {
		host: REDIS_HOST,
		port: REDIS_PORT,
	},
	password: REDIS_PASSWORD,
});

redisClient
	.connect()
	.then(() => {
		console.log("Connected to Redis");
	})
	.catch((error) => {
		console.log(error);
	});

export default redisClient;
