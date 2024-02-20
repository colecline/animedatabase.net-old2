import express from "express";
import * as SubmissionsController from "../controllers/submissions";
import { validate } from "../middlewares/Validator";
import { AnimeSubmissionSchema } from "../validators/submissions.validator";

const router = express.Router();

router.post("/anime", validate(AnimeSubmissionSchema), SubmissionsController.POST_SUBMISSIONS);
router.get("/", SubmissionsController.GET_SUBMISSIONS);
router.get("/:id", SubmissionsController.GET_SUBMISSIONS_ID);

export default router;
