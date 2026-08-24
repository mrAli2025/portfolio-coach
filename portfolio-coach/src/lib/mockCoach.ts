import { CoachRequest, CoachResponse } from "@/types/shared";

export function createMockFeedback(request: CoachRequest): CoachResponse {
  const strengths: string[] = [];
  const improvements: string[] = [];
  const nextSteps: string[] = [];
  let score = 70;

  const pitchLength = request.pitch.trim().length;
  const techStackLower = request.techStack.map((t) => t.toLowerCase());
  const roleLower = request.targetRole.toLowerCase();

  // 1. Analysera styrkor
  if (techStackLower.length >= 3) {
    strengths.push(`Bred och relevant teknikstack (${request.techStack.join(", ")}).`);
    score += 10;
  } else {
    strengths.push("Tydligt och fokuserat val av kärntekniker.");
  }

  if (pitchLength > 100) {
    strengths.push("Detaljerad pitch som ger en bra bild av din bakgrund.");
    score += 10;
  } else {
    strengths.push(`Tydlig inriktning mot rollen som ${request.targetRole}.`);
  }

  // 2. Anpassade förbättringsförslag baserat på input
  if (pitchLength < 80) {
    improvements.push("Din pitch är ganska kort. Utveckla vad du har byggt för tidigare projekt.");
  } else {
    improvements.push("Försök att korta ner pitchen något för att göra den ännu mer kärnfull.");
  }

  if (!techStackLower.includes("typescript")) {
    improvements.push("Överväg att lägga till TypeScript i din stack för att stärka din profil.");
  }

  if (roleLower.includes("frontend")) {
    improvements.push("Lyft fram kunskaper inom tillgänglighet (a11y) och responsiv design.");
  } else {
    improvements.push("Beskriv din problemlösningsförmåga och hur du samarbetar i team.");
  }

  if (!techStackLower.includes("typescript")) {
    nextSteps.push("Konvertera ett av dina befintliga JavaScript-projekt till TypeScript.");
  }

  if (roleLower.includes("frontend")) {
    nextSteps.push("Bygg en responsiv webbapplikation med fokus på god prestanda och UX.");
  } else {
    nextSteps.push("Skapa ett komplett fullstack-projekt med tydlig API-dokumentation.");
  }

  nextSteps.push("Uppdatera din GitHub-profil med ett välskrivet README för ditt huvudprojekt.");

  return {
    request,
    createdAt: new Date().toISOString(),
    feedback: {
      score: Math.min(score, 100),
      strengths,
      improvements,
      improvedPitch: `Hej! Jag heter ${request.name || "Utvecklare"} och siktar på rollen som ${
        request.targetRole
      }. Jag specialiserar mig på ${
        request.techStack.join(", ") || "webbutveckling"
      }. ${request.pitch}`,
      nextSteps,
    },
  };
}