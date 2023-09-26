import express, { Express } from "express";
import cors from "cors";
import dotenv from "dotenv";
import passport from "passport";

dotenv.config();

import sessionConfig from "./config/session.config";
import "./config/passport.config";

import ErrorHandler from "./middlewares/ErrorHandler";

import userRouter from "./routes/user";
import usersRouter from "./routes/users";

const app: Express = express();

const corsOptions = {
	origin: "http://localhost:3000",
	credentials: true,
	methods: "POST,GET,PUT,DELETE,OPTIONS",
	allowedHeaders: "Content-Type,Authorization",
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(sessionConfig);

app.use(passport.initialize());
app.use(passport.session());

app.use("/user", userRouter);
app.use("/users", usersRouter);

const PORT = process.env.PORT || 3010;

app.use(ErrorHandler);

app.listen(PORT, () => {
	console.log(`[AnimeDatabase.net] Listening on Port ${PORT}.`);
});
