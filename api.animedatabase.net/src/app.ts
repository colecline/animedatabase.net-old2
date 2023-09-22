import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import ErrorHandler from "./middlewares/ErrorHandler";

import usersRouter from "./routes/users";

dotenv.config();

const app: Express = express();

app.use(express.json());
app.use("/users", usersRouter);

const PORT = process.env.PORT || 3010;

app.use(ErrorHandler);

app.listen(PORT, () => {
	console.log(`[AnimeDatabase.net] Listening on Port ${PORT}.`);
});
