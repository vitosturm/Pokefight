'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getRoster } from '@/lib/roster';
import { getRandomOpponent } from '@/lib/actions';
import { submitScore } from '@/lib/leaderboard';
import { resolveBattle, type BattleResult } from '@/lib/battle';
import type { PokemonSummary } from '@/lib/types';

const SCORE_PER_WIN = 100;

export default function BattlePage() {
  const [roster, setRoster] = useState<PokemonSummary[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [opponent, setOpponent] = useState<PokemonSummary | null>(null);
  const [result, setResult] = useState<BattleResult | null>(null);
  const [wins, setWins] = useState(0);
  const [battles, setBattles] = useState(0);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const stored = getRoster();
    setRoster(stored);
    if (stored.length > 0) setSelectedId(stored[0].id);
  }, []);

  const selected = roster.find((p) => p.id === selectedId) ?? null;

  async function handleFight() {
    if (!selected) return;
    setLoading(true);
    setResult(null);
    setSubmitted(false);

    const randomOpponent = await getRandomOpponent();
    const battleResult = resolveBattle(selected, randomOpponent);

    setOpponent(randomOpponent);
    setResult(battleResult);
    setBattles((b) => b + 1);
    if (battleResult.winner === 'attacker') setWins((w) => w + 1);
    setLoading(false);
  }

  async function handleSubmitScore() {
    if (!username.trim()) return;
    const score = wins * SCORE_PER_WIN;
    const res = await submitScore({ username: username.trim(), score });
    if (res.ok) setSubmitted(true);
  }

  if (roster.length === 0) {
    return (
      <div className="text-center">
        <h1 className="mb-2 text-3xl font-bold">Battle</h1>
        <p className="mb-6 text-gray-500">
          You need at least one Pokémon in your roster before you can battle.
        </p>
        <Link href="/" className="text-red-600 hover:underline">
          Go to Pokédex &rarr;
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-2 text-3xl font-bold">Battle</h1>
      <p className="mb-6 text-gray-500">
        Pick a Pokémon from your roster and fight a random opponent.
      </p>

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Choose your Pokémon
        </label>
        <select
          value={selectedId ?? ''}
          onChange={(e) => setSelectedId(Number(e.target.value))}
          className="mb-4 w-full rounded-lg border border-gray-300 p-2 text-sm capitalize"
        >
          {roster.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>

        <button
          onClick={handleFight}
          disabled={loading || !selected}
          className="w-full rounded-lg bg-red-600 py-2 text-sm font-semibold text-white transition hover:bg-red-700 disabled:opacity-50"
        >
          {loading ? 'Fighting…' : 'Fight!'}
        </button>
      </div>

      <p className="mt-4 text-center text-sm text-gray-500">
        Wins: {wins} / {battles} battles
      </p>

      {result && selected && opponent && (
        <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm">
          <h2 className="text-xl font-bold">
            {result.winner === 'attacker' ? 'You won! 🎉' : 'You lost!'}
          </h2>

          <div className="mt-4 flex items-center justify-center gap-8">
            <div className="flex flex-col items-center">
              <Image src={selected.sprite} alt={selected.name} width={80} height={80} />
              <p className="mt-1 text-sm font-medium capitalize">{selected.name}</p>
              <p className="text-xs text-gray-400">Power: {result.attackerPower}</p>
            </div>
            <span className="text-gray-400">vs</span>
            <div className="flex flex-col items-center">
              <Image src={opponent.sprite} alt={opponent.name} width={80} height={80} />
              <p className="mt-1 text-sm font-medium capitalize">{opponent.name}</p>
              <p className="text-xs text-gray-400">Power: {result.defenderPower}</p>
            </div>
          </div>

          {result.winner === 'attacker' && !submitted && (
            <div className="mt-6 flex flex-col items-center gap-2">
              <p className="text-sm text-gray-500">Save your score to the leaderboard:</p>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Your name"
                maxLength={24}
                className="w-48 rounded-lg border border-gray-300 p-2 text-sm"
              />
              <button
                onClick={handleSubmitScore}
                className="rounded-lg bg-gray-800 px-4 py-2 text-sm font-medium text-white hover:bg-gray-900"
              >
                Submit score ({wins * SCORE_PER_WIN} pts)
              </button>
            </div>
          )}

          {submitted && <p className="mt-4 text-sm text-green-600">Score saved!</p>}
        </div>
      )}
    </div>
  );
}
