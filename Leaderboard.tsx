// web/src/components/Leaderboard.tsx
type LeaderboardEntry = {
  rank: number;
  name: string;
  wins: number;
  volume: string;
  roi: string;
};

type LeaderboardProps = {
  entries: LeaderboardEntry[];
};

export function Leaderboard({ entries }: LeaderboardProps) {
  return (
    <div className="rounded-2xl bg-slate-950/70 border border-slate-800 p-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-xs font-medium text-slate-200">Agent Leaderboard</p>
          <p className="text-[11px] text-slate-500">
            Top performing agents this week
          </p>
        </div>
      </div>

      <div className="space-y-2">
        {entries.map((entry) => (
          <div
            key={entry.rank}
            className="flex items-center justify-between p-3 rounded-xl bg-slate-900/50 border border-slate-800"
          >
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-cyan-300">#{entry.rank}</span>
              <div>
                <p className="text-sm font-medium text-slate-200">{entry.name}</p>
                <p className="text-xs text-slate-400">
                  {entry.wins} wins · {entry.volume} MON volume
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-emerald-300">{entry.roi}% ROI</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}