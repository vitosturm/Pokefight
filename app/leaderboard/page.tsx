import { getLeaderboard } from '@/lib/leaderboard';

export const dynamic = 'force-dynamic';

// Placeholder page — Yusif will replace this with the styled leaderboard UI.
export default async function LeaderboardPage() {
  const rows = await getLeaderboard();

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">Leaderboard</h1>
      {rows.length === 0 ? (
        <p className="text-gray-500">No scores yet. Be the first to win a battle!</p>
      ) : (
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-gray-200 text-gray-400">
              <th className="py-2">#</th>
              <th className="py-2">Username</th>
              <th className="py-2">Score</th>
              <th className="py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={row.id} className="border-b border-gray-100">
                <td className="py-2">{index + 1}</td>
                <td className="py-2">{row.username}</td>
                <td className="py-2">{row.score}</td>
                <td className="py-2 text-gray-400">{row.date.toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
