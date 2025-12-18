import { Trophy, Award, Medal, Crown, Star, Zap } from 'lucide-react';

export type RankType = 'Iron' | 'Bronze' | 'Silver' | 'Gold' | 'Platinum' | 'Diamond' | 'Master' | 'Grandmaster' | 'Challenger';

interface RankConfig {
  name: RankType;
  color: string;
  bgGradient: string;
  icon: typeof Trophy;
  message: string;
}

export const rankConfigs: Record<RankType, RankConfig> = {
  Iron: {
    name: 'Iron',
    color: '#5C4A3B',
    bgGradient: 'from-zinc-700 to-zinc-800',
    icon: Medal,
    message: 'Débute ton aventure — continue de courir !'
  },
  Bronze: {
    name: 'Bronze',
    color: '#CD7F32',
    bgGradient: 'from-orange-900 to-orange-950',
    icon: Medal,
    message: 'Coureur débutant — tu progresses bien !'
  },
  Silver: {
    name: 'Silver',
    color: '#C0C0C0',
    bgGradient: 'from-gray-400 to-gray-500',
    icon: Award,
    message: 'Coureur régulier — beau travail !'
  },
  Gold: {
    name: 'Gold',
    color: '#FFD700',
    bgGradient: 'from-yellow-500 to-yellow-600',
    icon: Award,
    message: 'Bon coureur — performance solide !'
  },
  Platinum: {
    name: 'Platinum',
    color: '#00CED1',
    bgGradient: 'from-cyan-500 to-cyan-600',
    icon: Trophy,
    message: 'Coureur avancé — excellent niveau !'
  },
  Diamond: {
    name: 'Diamond',
    color: '#4169E1',
    bgGradient: 'from-blue-500 to-blue-600',
    icon: Trophy,
    message: 'Coureur d\'élite — impressionnant !'
  },
  Master: {
    name: 'Master',
    color: '#9B30FF',
    bgGradient: 'from-purple-600 to-purple-700',
    icon: Crown,
    message: 'Athlète confirmé — performance exceptionnelle !'
  },
  Grandmaster: {
    name: 'Grandmaster',
    color: '#DC143C',
    bgGradient: 'from-red-600 to-red-700',
    icon: Star,
    message: 'Athlète de très haut niveau — remarquable !'
  },
  Challenger: {
    name: 'Challenger',
    color: '#00FFFF',
    bgGradient: 'from-cyan-400 to-blue-500',
    icon: Zap,
    message: 'Niveau compétiteur — élite absolue !'
  }
};

interface RankBadgeProps {
  rank: RankType;
  size?: 'small' | 'large';
}

export function RankBadge({ rank, size = 'large' }: RankBadgeProps) {
  const config = rankConfigs[rank];
  const Icon = config.icon;

  if (size === 'small') {
    return (
      <div 
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg"
        style={{ 
          backgroundColor: `${config.color}20`,
          borderLeft: `3px solid ${config.color}`
        }}
      >
        <Icon size={20} style={{ color: config.color }} />
        <span style={{ color: config.color }}>{rank}</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6 p-8">
      <div 
        className={`relative w-32 h-32 rounded-full flex items-center justify-center bg-gradient-to-br ${config.bgGradient} shadow-2xl`}
        style={{ 
          boxShadow: `0 0 50px ${config.color}40, 0 0 100px ${config.color}20`
        }}
      >
        <Icon size={64} className="text-white drop-shadow-lg" />
      </div>
      
      <div className="text-center space-y-2">
        <h2 
          className="text-5xl tracking-wider uppercase"
          style={{ 
            color: config.color,
            textShadow: `0 0 20px ${config.color}60`
          }}
        >
          {rank}
        </h2>
        <p className="text-zinc-400 max-w-sm">
          {config.message}
        </p>
      </div>
    </div>
  );
}
