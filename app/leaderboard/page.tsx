import { getLeaderboard } from '@/lib/leaderboard';

export const dynamic = 'force-dynamic';

const MEDALS = ['🥇', '🥈', '🥉'];

export default async function LeaderboardPage() {
  const rows = await getLeaderboard();

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold text-ink">
        Leader<span className="text-accent">board</span>
      </h1>
      {rows.length === 0 ? (
        <p className="text-muted">No scores yet. Be the first to win a battle!</p>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-border bg-surface">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-accent/20 text-muted">
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">Username</th>
                <th className="px-4 py-3">Score</th>
                <th className="px-4 py-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr
                  key={row.id}
                  className="border-b border-accent/10 transition-colors last:border-b-0 hover:bg-surface-hover"
                >
                  <td className="px-4 py-3 font-semibold text-ink">
                    {index < 3 ? (
                      <span className="text-lg">{MEDALS[index]}</span>
                    ) : (
                      index + 1
                    )}
                  </td>
                  <td className="px-4 py-3 font-medium text-accent">{row.username}</td>
                  <td className="px-4 py-3 font-semibold text-ink">{row.score}</td>
                  <td className="px-4 py-3 text-muted">{row.date.toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}