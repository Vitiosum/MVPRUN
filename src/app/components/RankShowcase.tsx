import { RankBadge, rankConfigs, RankType } from './RankBadge';

export function RankShowcase() {
  const ranks: RankType[] = [
    'Iron',
    'Bronze',
    'Silver',
    'Gold',
    'Platinum',
    'Diamond',
    'Master',
    'Grandmaster',
    'Challenger'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 text-white p-8">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-5xl">Système de Ranks RunRank</h1>
          <p className="text-zinc-400 text-lg">
            9 niveaux inspirés de League of Legends
          </p>
        </div>

        {/* Large Badges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ranks.map((rank) => (
            <div
              key={rank}
              className="bg-zinc-900/50 backdrop-blur-sm rounded-2xl border border-zinc-800 overflow-hidden"
            >
              <RankBadge rank={rank} size="large" />
            </div>
          ))}
        </div>

        {/* Small Badges */}
        <div className="space-y-6">
          <h2 className="text-2xl text-center text-zinc-300">Version compacte</h2>
          <div className="flex flex-wrap gap-4 justify-center">
            {ranks.map((rank) => (
              <RankBadge key={rank} rank={rank} size="small" />
            ))}
          </div>
        </div>

        {/* Color System */}
        <div className="space-y-6">
          <h2 className="text-2xl text-center text-zinc-300">Système de couleurs</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {ranks.map((rank) => {
              const config = rankConfigs[rank];
              return (
                <div
                  key={rank}
                  className="bg-zinc-900/50 backdrop-blur-sm rounded-xl border border-zinc-800 p-6 space-y-3"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-lg"
                      style={{ backgroundColor: config.color }}
                    />
                    <div>
                      <p className="text-white">{rank}</p>
                      <p className="text-zinc-500 text-sm">{config.color}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Pace Thresholds */}
        <div className="space-y-6">
          <h2 className="text-2xl text-center text-zinc-300">Seuils de performance</h2>
          <div className="bg-zinc-900/50 backdrop-blur-sm rounded-xl border border-zinc-800 overflow-hidden">
            <table className="w-full">
              <thead className="bg-zinc-800/50">
                <tr>
                  <th className="px-6 py-4 text-left text-zinc-300">Rank</th>
                  <th className="px-6 py-4 text-left text-zinc-300">Pace (min/km)</th>
                  <th className="px-6 py-4 text-left text-zinc-300">Percentile</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                <tr>
                  <td className="px-6 py-4">
                    <RankBadge rank="Challenger" size="small" />
                  </td>
                  <td className="px-6 py-4 text-zinc-300">{'< 3:00'}</td>
                  <td className="px-6 py-4 text-zinc-300">Top 1%</td>
                </tr>
                <tr>
                  <td className="px-6 py-4">
                    <RankBadge rank="Grandmaster" size="small" />
                  </td>
                  <td className="px-6 py-4 text-zinc-300">3:00 - 3:30</td>
                  <td className="px-6 py-4 text-zinc-300">Top 3%</td>
                </tr>
                <tr>
                  <td className="px-6 py-4">
                    <RankBadge rank="Master" size="small" />
                  </td>
                  <td className="px-6 py-4 text-zinc-300">3:30 - 4:00</td>
                  <td className="px-6 py-4 text-zinc-300">Top 5%</td>
                </tr>
                <tr>
                  <td className="px-6 py-4">
                    <RankBadge rank="Diamond" size="small" />
                  </td>
                  <td className="px-6 py-4 text-zinc-300">4:00 - 4:30</td>
                  <td className="px-6 py-4 text-zinc-300">Top 10%</td>
                </tr>
                <tr>
                  <td className="px-6 py-4">
                    <RankBadge rank="Platinum" size="small" />
                  </td>
                  <td className="px-6 py-4 text-zinc-300">4:30 - 5:00</td>
                  <td className="px-6 py-4 text-zinc-300">Top 20%</td>
                </tr>
                <tr>
                  <td className="px-6 py-4">
                    <RankBadge rank="Gold" size="small" />
                  </td>
                  <td className="px-6 py-4 text-zinc-300">5:00 - 5:30</td>
                  <td className="px-6 py-4 text-zinc-300">Top 35%</td>
                </tr>
                <tr>
                  <td className="px-6 py-4">
                    <RankBadge rank="Silver" size="small" />
                  </td>
                  <td className="px-6 py-4 text-zinc-300">5:30 - 6:30</td>
                  <td className="px-6 py-4 text-zinc-300">Top 50%</td>
                </tr>
                <tr>
                  <td className="px-6 py-4">
                    <RankBadge rank="Bronze" size="small" />
                  </td>
                  <td className="px-6 py-4 text-zinc-300">6:30 - 7:30</td>
                  <td className="px-6 py-4 text-zinc-300">Top 70%</td>
                </tr>
                <tr>
                  <td className="px-6 py-4">
                    <RankBadge rank="Iron" size="small" />
                  </td>
                  <td className="px-6 py-4 text-zinc-300">{'> 7:30'}</td>
                  <td className="px-6 py-4 text-zinc-300">Top 85%+</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
