import { z } from "zod";

export const ActionSchema = z.object({
	target: z.string().nonempty("Action target must be provided."),
	targetField: z.string().nonempty("Action target field must be provided."),
	content: z.string().nonempty("Action content must be provided."),
});

export const AnimeSubmissionSchema = z.object({
	actions: z.array(ActionSchema).nonempty("At least one action must be provided."),
});
