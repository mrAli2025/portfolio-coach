"use client";

import { useState, FormEvent } from "react";
import { CoachResponse, RequestState } from "@/types/shared";
import { getCoachFeedback } from "@/lib/client";

export default function PortfolioCoachForm() {
  const [name, setName] = useState("");
  const [targetRole, setTargetRole] = useState("");
  const [techStackInput, setTechStackInput] = useState("");
  const [pitch, setPitch] = useState("");

  const [status, setStatus] = useState<RequestState>("idle");
  const [result, setResult] = useState<CoachResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const techStack = techStackInput
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    try {
      const data = await getCoachFeedback({
        name,
        targetRole,
        techStack,
        pitch,
      });

      setResult(data);
      setStatus("ready");
    } catch (err) {
      setErrorMessage(
        err instanceof Error ? err.message : "Något gick fel."
      );
      setStatus("error");
    }
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Namn</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="t.ex. Sara Andersson"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Målroll</label>
          <input
            type="text"
            required
            value={targetRole}
            onChange={(e) => setTargetRole(e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="t.ex. Frontend Developer Intern"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Teknikstack (separera med komma)
          </label>
          <input
            type="text"
            required
            value={techStackInput}
            onChange={(e) => setTechStackInput(e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="t.ex. React, TypeScript, Next.js"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Pitch</label>
          <textarea
            required
            rows={4}
            value={pitch}
            onChange={(e) => setPitch(e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="t.ex. Jag söker LIA inom frontend och har byggt flera skolprojekt..."
          />
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {status === "loading" ? "Genererar feedback..." : "Få feedback"}
        </button>
      </form>

      {/* 1. State: idle */}
      {status === "idle" && (
        <div className="p-4 bg-blue-50 text-blue-800 border border-blue-200 rounded-md">
          Fyll i formuläret ovan och klicka på &quot;Få feedback&quot; för att starta din granskning.
        </div>
      )}

      {/* 2. State: loading */}
      {status === "loading" && (
        <div className="p-4 bg-amber-50 text-amber-800 border border-amber-200 rounded-md animate-pulse">
          Hämtar feedback från din Portfolio Coach...
        </div>
      )}

      {/* 3. State: error */}
      {status === "error" && (
        <div className="p-4 bg-red-50 text-red-700 border border-red-200 rounded-md">
          <p className="font-semibold">Ett fel uppstod:</p>
          <p>{errorMessage}</p>
        </div>
      )}

      {/* 4. State: ready */}
      {status === "ready" && result && (
        <div className="p-6 border rounded-md space-y-6 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b pb-4">
            <h2 className="text-2xl font-bold">Feedback</h2>
            <div className="text-right">
              <span className="block text-xs text-gray-500 uppercase font-semibold">Score</span>
              <span className="text-2xl font-extrabold text-blue-600">
                {result.feedback.score} / 100
              </span>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-green-700 mb-2">Styrkor</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-800">
              {result.feedback.strengths.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-amber-700 mb-2">Förbättringsförslag</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-800">
              {result.feedback.improvements.map((imp, i) => (
                <li key={i}>{imp}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-purple-700 mb-2">Förbättrad pitch</h3>
            <p className="italic bg-gray-50 p-4 border rounded-md text-gray-900">
              &quot;{result.feedback.improvedPitch}&quot;
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-blue-700 mb-2">Konkreta nästa steg</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-800">
              {result.feedback.nextSteps.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}