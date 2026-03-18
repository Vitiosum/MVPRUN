import { useState, useRef } from "react";
import { DistanceSelector } from "./components/DistanceSelector";
import { ResultCard } from "./components/ResultCard";
import { calculateRunResult } from "./utils/calculations";
import { Trophy, AlertCircle } from "lucide-react";

export default function App() {
  const [distance, setDistance] = useState("10");
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");
  const [result, setResult] = useState<ReturnType<typeof calculateRunResult>>(null);
  const [error, setError] = useState("");
  const [isCalculating, setIsCalculating] = useState(false);

  const minutesRef = useRef<HTMLInputElement>(null);
  const secondsRef = useRef<HTMLInputElement>(null);

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const h = parseInt(hours || "0", 10);
    const m = parseInt(minutes || "0", 10);
    const s = parseInt(seconds || "0", 10);

    if (h === 0 && m === 0 && s === 0) {
      setError("Veuillez entrer un temps valide");
      return;
    }

    setIsCalculating(true);
    await new Promise((resolve) => setTimeout(resolve, 500));

    const distanceKm = parseInt(distance, 10);
    const timeString =
      h > 0
        ? `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
        : `${m}:${String(s).padStart(2, "0")}`;

    const calculatedResult = calculateRunResult(distanceKm, timeString);
    setIsCalculating(false);

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

  const handleHoursChange = (val: string) => {
    setHours(val);
    if (val.length >= 2) minutesRef.current?.focus();
  };

  const handleMinutesChange = (val: string) => {
    setMinutes(val);
    if (val.length >= 2 && parseInt(val) >= 10) secondsRef.current?.focus();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 text-white">
      <div className="container mx-auto px-4 py-10 md:py-16 max-w-md">
        {!result ? (
          <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="text-center space-y-3">
              <div className="flex items-center justify-center gap-3">
                <div className="relative">
                  <Trophy size={38} className="text-[#00CED1]" />
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#00CED1] rounded-full animate-ping opacity-75" />
                </div>
                <h1 className="text-5xl tracking-tight font-light">
                  Run<span className="text-[#00CED1] font-semibold">Rank</span>
                </h1>
              </div>
              <p className="text-zinc-400 text-sm">
                Classe ton niveau comme sur League of Legends
              </p>
            </div>

            {/* Form */}
            <form
              onSubmit={handleCalculate}
              className="space-y-6 bg-zinc-900/50 backdrop-blur-sm rounded-2xl border border-zinc-800 p-7"
            >
              {/* Distance */}
              <div className="space-y-3">
                <label className="block text-zinc-400 text-xs font-medium uppercase tracking-widest">
                  Distance
                </label>
                <DistanceSelector value={distance} onChange={setDistance} />
              </div>

              {/* Time */}
              <div className="space-y-3">
                <label className="block text-zinc-400 text-xs font-medium uppercase tracking-widest">
                  Ton temps
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-1.5">
                    <input
                      type="number"
                      min="0"
                      max="24"
                      placeholder="0"
                      value={hours}
                      onChange={(e) => handleHoursChange(e.target.value)}
                      className="w-full px-3 py-3.5 bg-zinc-800 border border-zinc-700 rounded-xl text-white text-center text-lg focus:outline-none focus:border-[#00CED1] focus:ring-1 focus:ring-[#00CED1]/30 transition-colors placeholder:text-zinc-600"
                    />
                    <p className="text-center text-[11px] text-zinc-600">heures</p>
                  </div>
                  <div className="space-y-1.5">
                    <input
                      ref={minutesRef}
                      type="number"
                      min="0"
                      max="59"
                      placeholder="0"
                      value={minutes}
                      onChange={(e) => handleMinutesChange(e.target.value)}
                      className="w-full px-3 py-3.5 bg-zinc-800 border border-zinc-700 rounded-xl text-white text-center text-lg focus:outline-none focus:border-[#00CED1] focus:ring-1 focus:ring-[#00CED1]/30 transition-colors placeholder:text-zinc-600"
                    />
                    <p className="text-center text-[11px] text-zinc-600">minutes</p>
                  </div>
                  <div className="space-y-1.5">
                    <input
                      ref={secondsRef}
                      type="number"
                      min="0"
                      max="59"
                      placeholder="0"
                      value={seconds}
                      onChange={(e) => setSeconds(e.target.value)}
                      className="w-full px-3 py-3.5 bg-zinc-800 border border-zinc-700 rounded-xl text-white text-center text-lg focus:outline-none focus:border-[#00CED1] focus:ring-1 focus:ring-[#00CED1]/30 transition-colors placeholder:text-zinc-600"
                    />
                    <p className="text-center text-[11px] text-zinc-600">secondes</p>
                  </div>
                </div>

                {error && (
                  <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2.5">
                    <AlertCircle size={14} className="shrink-0" />
                    {error}
                  </div>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isCalculating}
                className="w-full py-4 bg-gradient-to-r from-[#00CED1] to-[#00B4D8] hover:from-[#00B4D8] hover:to-[#0096C7] disabled:opacity-60 text-white rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2.5 font-medium text-base"
              >
                {isCalculating ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Calcul en cours…
                  </>
                ) : (
                  "Calculer mon rang"
                )}
              </button>
            </form>

            <p className="text-center text-zinc-600 text-xs">
              Laisse les heures à 0 si tu cours moins d'1 heure
            </p>
          </div>
        ) : (
          <ResultCard
            distance={distance}
            time={
              hours
                ? `${hours}:${String(minutes || "0").padStart(2, "0")}:${String(seconds || "0").padStart(2, "0")}`
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
