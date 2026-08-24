export type CoachRequest = {
  name: string;
  targetRole: string;
  techStack: string[];
  pitch: string;
};

export type CoachFeedback = {
  score: number;
  strengths: string[];
  improvements: string[];
  improvedPitch: string;
  nextSteps: string[];
};

export type CoachResponse = {
  request: CoachRequest;
  feedback: CoachFeedback;
  createdAt: string;
};

export type RequestState = "idle" | "loading" | "error" | "ready";