import { Clock, Gauge, TrendingUp } from 'lucide-react';
import { RankBadge, RankType } from './RankBadge';

interface ResultCardProps {
  distance: string;
  time: string;
  pace: string;
  percentile: number;
  rank: RankType;
  onReset: () => void;
}

export function ResultCard({ distance, time, pace, percentile, rank, onReset }: ResultCardProps) {
  const distanceLabels: Record<string, string> = {
    '5': '5 km',
    '10': '10 km',
    '21': '21 km (Semi-marathon)',
    '42': '42 km (Marathon)'
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-8 animate-in fade-in duration-700">
      {/* Rank Badge */}
      <div className="bg-zinc-900/80 backdrop-blur-sm rounded-2xl border border-zinc-800 overflow-hidden">
        <RankBadge rank={rank} size="large" />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-zinc-900/80 backdrop-blur-sm rounded-xl border border-zinc-800 p-6 space-y-3">
          <div className="flex items-center gap-2 text-zinc-400">
            <Clock size={20} />
            <span className="uppercase tracking-wide">Temps</span>
          </div>
          <div className="space-y-1">
            <p className="text-3xl text-white">{time}</p>
            <p className="text-sm text-zinc-500">{distanceLabels[distance]}</p>
          </div>
        </div>

        <div className="bg-zinc-900/80 backdrop-blur-sm rounded-xl border border-zinc-800 p-6 space-y-3">
          <div className="flex items-center gap-2 text-zinc-400">
            <Gauge size={20} />
            <span className="uppercase tracking-wide">Pace</span>
          </div>
          <div className="space-y-1">
            <p className="text-3xl text-white">{pace}</p>
            <p className="text-sm text-zinc-500">min/km</p>
          </div>
        </div>

        <div className="bg-zinc-900/80 backdrop-blur-sm rounded-xl border border-zinc-800 p-6 space-y-3">
          <div className="flex items-center gap-2 text-zinc-400">
            <TrendingUp size={20} />
            <span className="uppercase tracking-wide">Percentile</span>
          </div>
          <div className="space-y-1">
            <p className="text-3xl text-white">Top {percentile}%</p>
            <p className="text-sm text-zinc-500">des coureurs</p>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={onReset}
        className="w-full py-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700 transition-all duration-200 hover:scale-[1.02]"
      >
        Refaire un calcul
      </button>
    </div>
  );
}
