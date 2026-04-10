import { useState } from "react";
import { Share2, Check, TrendingUp, RotateCcw } from "lucide-react";
import { RankBadge, RankType, rankConfigs } from "./RankBadge";
import { getNextRank } from "../utils/calculations";

interface ResultCardProps {
  distance:   string;
  time:       string;
  pace:       string;
  percentile: number;
  rank:       RankType;
  onReset:    () => void;
}

const SURFACE   = "hsl(0, 0%, 11%)";
const BORDER    = "hsl(0, 0%, 20%)";
const TEXT      = "hsl(0, 0%, 98%)";
const MUTED_DIM = "hsl(0, 0%, 28%)";
const MUTED     = "hsl(0, 0%, 55%)";

const distanceLabels: Record<string, string> = {
  "5":  "5 km",
  "10": "10 km",
  "21": "21 km (Semi)",
  "42": "42 km (Marathon)",
};

export function ResultCard({ distance, time, pace, percentile, rank, onReset }: ResultCardProps) {
  const [copied, setCopied] = useState(false);

  const nextRankInfo   = getNextRank(rank);
  const rankColor      = rankConfigs[rank].color;
  const progressPercent = 100 - percentile;

  const handleShare = () => {
    const text = `🏃 ${distanceLabels[distance]} en ${time} · Allure ${pace}/km · Rang ${rank} (Top ${percentile}%) #RunRank`;
    if (navigator.share) {
      navigator.share({ title: "Mon rang RunRank", text });
    } else {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const cardStyle = { background: SURFACE, border: `1px solid ${BORDER}` };
  const cardShadow = "0 2.8px 2.2px rgba(0,0,0,0.2), 0 6.7px 5.3px rgba(0,0,0,0.14), 0 22.3px 17.9px rgba(0,0,0,0.1)";

  return (
    <div
      className="w-full space-y-2.5 nx-animate nx-a1"
      style={{ maxWidth: 460, margin: "0 auto" }}
    >

      {/* Rank Hero */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          ...cardStyle,
          boxShadow: cardShadow,
          borderTop: `2px solid ${rankColor}55`,
        }}
      >
        <RankBadge rank={rank} size="large" />
      </div>

      {/* Percentile bar */}
      <div className="rounded-2xl p-5 space-y-3 nx-animate nx-a2" style={{ ...cardStyle, boxShadow: cardShadow }}>
        <div className="flex justify-between items-center">
          <span
            className="text-[10px] font-semibold uppercase tracking-[0.1em]"
            style={{ color: MUTED_DIM }}
          >
            Position parmi les coureurs
          </span>
          <span
            className="text-sm font-medium"
            style={{ fontFamily: "var(--font-mono)", color: rankColor }}
          >
            Top {percentile}%
          </span>
        </div>
        <div
          className="h-1.5 rounded-full overflow-hidden"
          style={{ background: "rgba(255,255,255,0.06)" }}
        >
          <div
            className="h-full rounded-full transition-all duration-1000 ease-out"
            style={{
              width: `${progressPercent}%`,
              background: `linear-gradient(90deg, ${rankColor}55, ${rankColor})`,
              boxShadow: `0 0 8px ${rankColor}40`,
            }}
          />
        </div>
        <div className="flex justify-between text-[10px]" style={{ color: MUTED_DIM, opacity: 0.7 }}>
          <span>Iron</span>
          <span>Challenger</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-2.5 nx-animate nx-a3">
        {[
          {
            icon: (
              <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
              </svg>
            ),
            label: "Temps",
            value: time,
            sub: distanceLabels[distance],
          },
          {
            icon: (
              <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
            ),
            label: "Allure",
            value: pace,
            sub: "min / km",
          },
        ].map(({ icon, label, value, sub }) => (
          <div key={label} className="rounded-2xl p-5 space-y-2.5" style={{ ...cardStyle, boxShadow: cardShadow }}>
            <div
              className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.1em]"
              style={{ color: MUTED_DIM }}
            >
              {icon}
              {label}
            </div>
            <p
              className="leading-none"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 30,
                fontWeight: 500,
                color: TEXT,
                letterSpacing: "-0.02em",
              }}
            >
              {value}
            </p>
            <p className="text-[11px]" style={{ color: MUTED }}>{sub}</p>
          </div>
        ))}
      </div>

      {/* Next rank */}
      {nextRankInfo && (
        <div
          className="rounded-2xl p-4 flex items-center justify-between nx-animate nx-a4"
          style={{ ...cardStyle, boxShadow: cardShadow }}
        >
          <div className="space-y-1.5">
            <p
              className="text-[10px] font-semibold uppercase tracking-[0.1em]"
              style={{ color: MUTED_DIM }}
            >
              Prochain rang
            </p>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm" style={{ color: rankConfigs[nextRankInfo.rank].color }}>
                {nextRankInfo.rank}
              </span>
              <span style={{ color: MUTED_DIM }}>›</span>
              <span
                className="text-[13px]"
                style={{ fontFamily: "var(--font-mono)", color: MUTED, letterSpacing: "-0.02em" }}
              >
                pace &lt; {nextRankInfo.targetPace}/km
              </span>
            </div>
          </div>
          <TrendingUp size={16} style={{ color: MUTED_DIM }} />
        </div>
      )}

      {/* Actions */}
      <div className="grid grid-cols-2 gap-2.5 pt-1 nx-animate nx-a5">
        <button
          onClick={handleShare}
          className="py-3.5 rounded-[10px] flex items-center justify-center gap-2 text-sm font-medium transition-all duration-150"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: `1px solid ${BORDER}`,
            color: TEXT,
            letterSpacing: "-0.01em",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background   = "rgba(255,255,255,0.06)";
            e.currentTarget.style.borderColor  = "hsl(0, 0%, 26%)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background  = "rgba(255,255,255,0.03)";
            e.currentTarget.style.borderColor = BORDER;
          }}
        >
          {copied ? (
            <>
              <Check size={14} style={{ color: "#4ADE80" }} />
              <span style={{ color: "#4ADE80" }}>Copié !</span>
            </>
          ) : (
            <>
              <Share2 size={14} />
              Partager
            </>
          )}
        </button>

        <button
          onClick={onReset}
          className="py-3.5 rounded-[10px] flex items-center justify-center gap-2 text-sm font-medium transition-all duration-150"
          style={{
            background: `${rankColor}12`,
            border: `1px solid ${rankColor}32`,
            color: rankColor,
            letterSpacing: "-0.01em",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = `${rankColor}20`; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = `${rankColor}12`; }}
        >
          <RotateCcw size={14} />
          Recalculer
        </button>
      </div>
    </div>
  );
}
