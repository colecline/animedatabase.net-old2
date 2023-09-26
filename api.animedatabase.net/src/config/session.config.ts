import session from "express-session";
import RedisStore from "connect-redis";
import redisClient from "./redis.config";

const store = new RedisStore({
	client: redisClient,
	prefix: "animedatabase.net:",
}) as unknown as session.Store;

const sessionConfig = session({
	name: "sessionId",
	store,
	resave: false,
	saveUninitialized: false,
	secret: "meow",
	cookie: {
		secure: false, // set to true in production
		httpOnly: true,
		sameSite: "lax",
		maxAge: 1000 * 60 * 30,
	},
});

export default sessionConfig;
