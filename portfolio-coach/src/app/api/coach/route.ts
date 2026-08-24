import { NextResponse } from "next/server";
import { isCoachRequest } from "@/lib/validation";
import { createMockFeedback } from "@/lib/mockCoach";

export async function POST(req: Request) {
  try {
    const body: unknown = await req.json();

    // Validera att inkommande data matchar CoachRequest
    if (!isCoachRequest(body)) {
      return NextResponse.json(
        { error: "Ogiltig data. Alla fält måste fyllas korrekt." },
        { status: 400 }
      );
    }

    // Skapa och returnera feedback
    const response = createMockFeedback(body);
    return NextResponse.json(response, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Kunde inte behandla förfrågan." },
      { status: 400 }
    );
  }
}