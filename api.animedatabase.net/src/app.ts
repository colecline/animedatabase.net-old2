import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();

const PORT = process.env.PORT || 3010;

app.listen(PORT, () => {
	console.log(`[AnimeDatabase.net] Listening on Port ${PORT}.`);
});
