import { z } from "zod";
import { CoachRequest } from "@/types/shared";

export const coachRequestSchema = z.object({
  name: z.string().min(1, "Namn krävs"),
  targetRole: z.string().min(1, "Målroll krävs"),
  techStack: z.array(z.string()),
  pitch: z.string().min(1, "Pitch krävs"),
});

export function isCoachRequest(value: unknown): value is CoachRequest {
  const result = coachRequestSchema.safeParse(value);
  return result.success;
}