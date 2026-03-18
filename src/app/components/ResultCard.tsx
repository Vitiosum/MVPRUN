import { useState } from 'react';
import { Clock, Gauge, TrendingUp, Share2, Check, ChevronRight, RotateCcw } from 'lucide-react';
import { RankBadge, RankType, rankConfigs } from './RankBadge';
import { getNextRank } from '../utils/calculations';

interface ResultCardProps {
  distance: string;
  time: string;
  pace: string;
  percentile: number;
  rank: RankType;
  onReset: () => void;
}

export function ResultCard({ distance, time, pace, percentile, rank, onReset }: ResultCardProps) {
  const [copied, setCopied] = useState(false);

  const distanceLabels: Record<string, string> = {
    '5': '5 km',
    '10': '10 km',
    '21': '21 km (Semi)',
    '42': '42 km (Marathon)',
  };

  const nextRankInfo = getNextRank(rank);
  const rankColor = rankConfigs[rank].color;
  const progressPercent = 100 - percentile;

  const handleShare = () => {
    const text = `🏃 ${distanceLabels[distance]} en ${time} · Allure ${pace}/km · Rang ${rank} (Top ${percentile}%) #RunRank`;
    if (navigator.share) {
      navigator.share({ title: 'Mon rang RunRank', text });
    } else {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">

      {/* Rank Badge */}
      <div className="bg-zinc-900/80 backdrop-blur-sm rounded-2xl border border-zinc-800 overflow-hidden">
        <RankBadge rank={rank} size="large" />
      </div>

      {/* Percentile bar */}
      <div className="bg-zinc-900/80 backdrop-blur-sm rounded-xl border border-zinc-800 p-5 space-y-3">
        <div className="flex justify-between items-center text-sm">
          <span className="text-zinc-400">Position parmi les coureurs</span>
          <span className="font-semibold" style={{ color: rankColor }}>Top {percentile}%</span>
        </div>
        <div className="h-2.5 bg-zinc-800 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-1000 ease-out"
            style={{
              width: `${progressPercent}%`,
              background: `linear-gradient(90deg, ${rankColor}60, ${rankColor})`,
              boxShadow: `0 0 8px ${rankColor}50`,
            }}
          />
        </div>
        <div className="flex justify-between text-[11px] text-zinc-600">
          <span>Iron</span>
          <span>Challenger</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-zinc-900/80 backdrop-blur-sm rounded-xl border border-zinc-800 p-5 space-y-2">
          <div className="flex items-center gap-1.5 text-zinc-500 text-xs uppercase tracking-wide">
            <Clock size={13} />
            Temps
          </div>
          <p className="text-2xl text-white font-light">{time}</p>
          <p className="text-xs text-zinc-500">{distanceLabels[distance]}</p>
        </div>

        <div className="bg-zinc-900/80 backdrop-blur-sm rounded-xl border border-zinc-800 p-5 space-y-2">
          <div className="flex items-center gap-1.5 text-zinc-500 text-xs uppercase tracking-wide">
            <Gauge size={13} />
            Allure
          </div>
          <p className="text-2xl text-white font-light">{pace}</p>
          <p className="text-xs text-zinc-500">min/km</p>
        </div>
      </div>

      {/* Next rank */}
      {nextRankInfo && (
        <div className="bg-zinc-900/80 backdrop-blur-sm rounded-xl border border-zinc-800 p-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-zinc-500 text-xs uppercase tracking-wide">Prochain rang</p>
              <div className="flex items-center gap-2">
                <span
                  className="font-semibold"
                  style={{ color: rankConfigs[nextRankInfo.rank].color }}
                >
                  {nextRankInfo.rank}
                </span>
                <ChevronRight size={13} className="text-zinc-600" />
                <span className="text-zinc-400 text-sm">
                  pace &lt; {nextRankInfo.targetPace}/km
                </span>
              </div>
            </div>
            <TrendingUp size={18} className="text-zinc-600" />
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="grid grid-cols-2 gap-3 pt-1">
        <button
          onClick={handleShare}
          className="py-3.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700 transition-all duration-200 flex items-center justify-center gap-2 text-sm"
        >
          {copied ? (
            <>
              <Check size={15} className="text-green-400" />
              <span className="text-green-400">Copié !</span>
            </>
          ) : (
            <>
              <Share2 size={15} />
              Partager
            </>
          )}
        </button>

        <button
          onClick={onReset}
          className="py-3.5 rounded-xl border transition-all duration-200 flex items-center justify-center gap-2 text-sm"
          style={{
            backgroundColor: `${rankColor}15`,
            borderColor: `${rankColor}40`,
            color: rankColor,
          }}
        >
          <RotateCcw size={15} />
          Recalculer
        </button>
      </div>
    </div>
  );
}
