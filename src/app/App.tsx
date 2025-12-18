import { useState } from "react";
import { DistanceSelector } from "./components/DistanceSelector";
import { ResultCard } from "./components/ResultCard";
import { calculateRunResult } from "./utils/calculations";
import { Trophy } from "lucide-react";

export default function App() {
  const [distance, setDistance] = useState("10");

  // Temps découpé
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");

  const [result, setResult] =
    useState<ReturnType<typeof calculateRunResult>>(null);
  const [error, setError] = useState("");

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const h = parseInt(hours || "0", 10);
    const m = parseInt(minutes || "0", 10);
    const s = parseInt(seconds || "0", 10);

    if (h === 0 && m === 0 && s === 0) {
      setError("Veuillez entrer un temps");
      return;
    }

    const distanceKm = parseInt(distance, 10);

    // Normalisation vers un format unique
    const timeString =
      h > 0
        ? `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
        : `${m}:${String(s).padStart(2, "0")}`;

    const calculatedResult = calculateRunResult(distanceKm, timeString);

    if (!calculatedResult) {
      setError("Temps invalide");
      return;
    }

    setResult(calculatedResult);
  };

  const handleReset = () => {
    setResult(null);
    setHours("");
    setMinutes("");
    setSeconds("");
    setError("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 text-white">
      <div className="container mx-auto px-4 py-12 md:py-20">
        {!result ? (
          <div className="max-w-md mx-auto space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-3 mb-6">
                <Trophy size={40} className="text-[#00CED1]" />
                <h1 className="text-5xl tracking-tight">
                  Run<span className="text-[#00CED1]">Rank</span>
                </h1>
              </div>
              <p className="text-zinc-400 text-lg">
                Classe ton niveau de coureur comme sur League of Legends
              </p>
            </div>

            {/* Form */}
            <form
              onSubmit={handleCalculate}
              className="space-y-6 bg-zinc-900/50 backdrop-blur-sm rounded-2xl border border-zinc-800 p-8"
            >
              {/* Distance */}
              <div className="space-y-3">
                <label className="block text-zinc-300">Distance</label>
                <DistanceSelector value={distance} onChange={setDistance} />
              </div>

              {/* Temps HMS */}
              <div className="space-y-3">
                <label className="block text-zinc-300">Temps</label>

                <div className="grid grid-cols-3 gap-3">
                  <input
                    type="number"
                    min="0"
                    placeholder="Heures"
                    value={hours}
                    onChange={(e) => setHours(e.target.value)}
                    className="px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white text-center"
                  />

                  <input
                    type="number"
                    min="0"
                    placeholder="Minutes"
                    value={minutes}
                    onChange={(e) => setMinutes(e.target.value)}
                    className="px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white text-center"
                  />

                  <input
                    type="number"
                    min="0"
                    placeholder="Secondes"
                    value={seconds}
                    onChange={(e) => setSeconds(e.target.value)}
                    className="px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white text-center"
                  />
                </div>

                {error && <p className="text-red-400 text-sm">{error}</p>}
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-[#00CED1] to-[#00B4D8] hover:from-[#00B4D8] hover:to-[#0096C7] text-white rounded-lg transition-all duration-200 hover:scale-[1.02]"
              >
                Calculer mon rank
              </button>
            </form>

            <div className="text-center text-zinc-500 text-sm">
              Tu peux remplir uniquement ce que tu veux (ex : minutes seules)
            </div>
          </div>
        ) : (
          <ResultCard
            distance={distance}
            time={
              hours
                ? `${hours}:${String(minutes || "0").padStart(2, "0")}:${String(
                    seconds || "0"
                  ).padStart(2, "0")}`
                : `${minutes}:${String(seconds || "0").padStart(2, "0")}`
            }
            pace={result.pace}
            percentile={result.percentile}
            rank={result.rank}
            onReset={handleReset}
          />
        )}
      </div>
    </div>
  );
}
