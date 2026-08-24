import { CoachRequest, CoachResponse } from "@/types/shared";

export async function getCoachFeedback(
  request: CoachRequest
): Promise<CoachResponse> {
  const response = await fetch("/api/coach", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(
      errorData?.error || "Kunde inte hämta feedback från API:t."
    );
  }

  const data: CoachResponse = await response.json();
  return data;
}