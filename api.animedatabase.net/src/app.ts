import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import ErrorHandler from "./middlewares/ErrorHandler";

import usersRouter from "./routes/users";

dotenv.config();

const app: Express = express();

const allowedOrigin = process.env.ALLOWED_ORIGIN || "http://localhost:3000";

const corsOptions = {
	origin: (
		origin: string | undefined,
		callback: (err: Error | null, allow?: boolean) => void
	) => {
		if (!origin || origin === allowedOrigin) {
			callback(null, true);
		} else {
			callback(new Error("Not allowed by CORS"));
		}
	},
	methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
	credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));
app.use("/users", usersRouter);

const PORT = process.env.PORT || 3010;

app.use(ErrorHandler);

app.listen(PORT, () => {
	console.log(`[AnimeDatabase.net] Listening on Port ${PORT}.`);
});
