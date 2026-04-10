import { useState, useRef } from "react";
import { DistanceSelector } from "./components/DistanceSelector";
import { ResultCard } from "./components/ResultCard";
import { Footer } from "./components/Footer";
import { calculateRunResult } from "./utils/calculations";
import { AlertCircle } from "lucide-react";

const ACCENT    = "#3b82f6";
const SURFACE   = "hsl(0, 0%, 11%)";
const BORDER    = "hsl(0, 0%, 20%)";
const TEXT      = "hsl(0, 0%, 98%)";
const MUTED_DIM = "hsl(0, 0%, 28%)";
const MUTED     = "hsl(0, 0%, 65%)";

export default function App() {
  const [distance, setDistance]         = useState("10");
  const [hours, setHours]               = useState("");
  const [minutes, setMinutes]           = useState("");
  const [seconds, setSeconds]           = useState("");
  const [result, setResult]             = useState<ReturnType<typeof calculateRunResult>>(null);
  const [error, setError]               = useState("");
  const [isCalculating, setIsCalculating] = useState(false);

  const minutesRef = useRef<HTMLInputElement>(null);
  const secondsRef = useRef<HTMLInputElement>(null);

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const h = parseInt(hours   || "0", 10);
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
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--nx-bg)", fontFamily: "var(--font-body)", color: TEXT }}
    >
      {/* Gradient blur overlay — atmospheric top fade */}
      <div
        className="fixed top-0 left-0 right-0 z-50 pointer-events-none"
        style={{
          height: "5rem",
          background: "linear-gradient(to bottom, var(--nx-bg) 0%, transparent 100%)",
        }}
      />

      <div className="mx-auto px-5 py-14" style={{ maxWidth: 460 }}>
        {!result ? (
          <div className="space-y-3">

            {/* Header */}
            <div className="mb-10 relative nx-animate nx-a1">
              {/* Iridescence glow */}
              <div
                className="absolute pointer-events-none"
                style={{
                  top: -40, left: "50%",
                  transform: "translateX(-50%)",
                  width: 320, height: 160,
                  background: "radial-gradient(ellipse at 50% 50%, rgba(59,130,246,0.13) 0%, transparent 70%)",
                  filter: "blur(24px)",
                  zIndex: 0,
                }}
              />
              <div className="flex items-center gap-3.5 mb-3 relative z-10">
                <div
                  className="relative flex items-center justify-center flex-shrink-0 rounded-[10px]"
                  style={{
                    width: 46, height: 46,
                    background: "rgba(59,130,246,0.1)",
                    border: "1px solid rgba(59,130,246,0.22)",
                    color: ACCENT,
                  }}
                >
                  <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full" style={{ background: ACCENT }}>
                    <span className="absolute inset-0 rounded-full animate-ping opacity-60" style={{ background: ACCENT }} />
                  </span>
                </div>
                <h1
                  className="leading-none"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 50,
                    fontWeight: 700,
                    color: TEXT,
                    letterSpacing: "-0.05em",
                  }}
                >
                  RUN<span style={{ color: ACCENT }}>RANK</span>
                </h1>
              </div>
              <p
                className="pl-[60px] text-[15px] relative z-10"
                style={{
                  fontFamily: "var(--font-display)",
                  fontStyle: "italic",
                  color: MUTED,
                  letterSpacing: "-0.02em",
                }}
              >
                Classe ton niveau comme sur League of Legends
              </p>
            </div>

            {/* Form Card */}
            <div
              className="rounded-2xl p-7 space-y-7 nx-animate nx-a2"
              style={{
                background: SURFACE,
                border: `1px solid ${BORDER}`,
                boxShadow: "0 2.8px 2.2px rgba(0,0,0,0.22), 0 6.7px 5.3px rgba(0,0,0,0.16), 0 12.5px 10px rgba(0,0,0,0.13), 0 22.3px 17.9px rgba(0,0,0,0.11), 0 41.8px 33.4px rgba(0,0,0,0.09), 0 100px 80px rgba(0,0,0,0.06)",
              }}
            >
              {/* Distance */}
              <div className="space-y-3">
                <label
                  className="block text-[10px] font-semibold uppercase tracking-[0.12em]"
                  style={{ color: MUTED_DIM }}
                >
                  Distance
                </label>
                <DistanceSelector value={distance} onChange={setDistance} />
              </div>

              {/* Time */}
              <div className="space-y-3">
                <label
                  className="block text-[10px] font-semibold uppercase tracking-[0.12em]"
                  style={{ color: MUTED_DIM }}
                >
                  Ton temps
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {[
                    { id: "hours",   val: hours,   onChange: handleHoursChange,            ref: undefined,  max: 24, label: "Heures"   },
                    { id: "minutes", val: minutes, onChange: handleMinutesChange,           ref: minutesRef, max: 59, label: "Minutes"  },
                    { id: "seconds", val: seconds, onChange: (v: string) => setSeconds(v), ref: secondsRef, max: 59, label: "Secondes" },
                  ].map(({ id, val, onChange, ref, max, label }) => (
                    <div key={id} className="flex flex-col items-center gap-2">
                      <input
                        ref={ref}
                        type="number"
                        min="0"
                        max={max}
                        placeholder="00"
                        value={val}
                        onChange={(e) => onChange(e.target.value)}
                        className="w-full rounded-[10px] text-center transition-all duration-150"
                        style={{
                          background: "var(--nx-bg)",
                          border: `1px solid ${BORDER}`,
                          color: TEXT,
                          fontFamily: "var(--font-mono)",
                          fontSize: 28,
                          fontWeight: 500,
                          padding: "14px 8px",
                          outline: "none",
                        }}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = ACCENT;
                          e.currentTarget.style.boxShadow = "0 0 0 3px rgba(59,130,246,0.12)";
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = BORDER;
                          e.currentTarget.style.boxShadow = "none";
                        }}
                      />
                      <span
                        className="text-[10px] font-semibold uppercase tracking-[0.08em]"
                        style={{ color: MUTED_DIM }}
                      >
                        {label}
                      </span>
                    </div>
                  ))}
                </div>

                {error && (
                  <div
                    className="flex items-center gap-2 text-sm rounded-lg px-3 py-2.5"
                    style={{
                      color: "#F87171",
                      background: "rgba(239,68,68,0.07)",
                      border: "1px solid rgba(239,68,68,0.18)",
                    }}
                  >
                    <AlertCircle size={13} className="shrink-0" />
                    {error}
                  </div>
                )}
              </div>

              {/* Shiny CTA */}
              <button
                className="shiny-cta"
                disabled={isCalculating}
                onClick={handleCalculate}
              >
                <span className="shiny-cta-inner">
                  <span className="shiny-cta-noise" />
                  {isCalculating ? (
                    <>
                      <span
                        className="w-4 h-4 border-2 rounded-full animate-spin"
                        style={{ borderColor: "rgba(255,255,255,0.25)", borderTopColor: "white" }}
                      />
                      Calcul en cours…
                    </>
                  ) : (
                    "Calculer mon rang"
                  )}
                </span>
              </button>
            </div>

            <p className="text-center text-xs nx-animate nx-a3" style={{ color: MUTED_DIM, paddingTop: 4 }}>
              Laisse les heures à 0 si tu cours moins d'1 heure
            </p>

            <div className="nx-animate nx-a4">
              <Footer />
            </div>
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
