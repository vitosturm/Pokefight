'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getRoster } from '@/lib/roster';
import { getRandomOpponent } from '@/lib/actions';
import { submitScore } from '@/lib/leaderboard';
import { resolveBattle, type BattleResult } from '@/lib/battle';
import { TYPE_COLORS } from '@/lib/typeColors';
import type { PokemonSummary } from '@/lib/types';

const SCORE_PER_WIN = 100;

export default function BattlePage() {
  const [roster, setRoster] = useState<PokemonSummary[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
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
  const preview = roster.find((p) => p.id === hoveredId) ?? selected;

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
      <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-surface px-6 py-20 text-center">
        <h1 className="mb-2 text-3xl font-bold text-ink">Battle</h1>
        <p className="mb-6 text-muted">
          You need at least one Pokémon in your roster before you can battle.
        </p>
        <Link
          href="/"
          className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-black transition-all duration-200 hover:scale-105 hover:bg-accent-hover hover:shadow-md hover:shadow-accent/30"
        >
          Go to Pokédex &rarr;
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="mb-2 text-3xl font-bold text-ink">Battle</h1>
      <p className="mb-6 text-muted">
        Pick a Pokémon from your roster and fight a random opponent.
      </p>

      <div className="flex flex-col items-start justify-center gap-6 lg:flex-row">
        {/* Roster list (left) */}
        <div className="order-2 max-h-80 w-full overflow-y-auto rounded-2xl border border-border bg-surface p-3 lg:order-1 lg:w-56">
          <p className="mb-2 px-1 text-xs font-medium uppercase tracking-wide text-muted">
            Your Roster
          </p>
          <ul className="flex flex-col gap-1">
            {roster.map((p) => (
              <li key={p.id}>
                <button
                  type="button"
                  onClick={() => setSelectedId(p.id)}
                  onMouseEnter={() => setHoveredId(p.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm capitalize transition-colors ${
                    selectedId === p.id
                      ? 'bg-accent/15 font-semibold text-accent ring-1 ring-accent/40'
                      : 'text-ink hover:bg-surface-hover'
                  }`}
                >
                  <Image src={p.sprite} alt="" width={24} height={24} className="shrink-0" />
                  {p.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Battle form (center) */}
        <div className="order-1 w-full max-w-md flex-1 lg:order-2">
          <div className="rounded-2xl border border-border bg-surface p-6 shadow-lg shadow-black/20">
            <p className="mb-2 text-sm font-medium text-ink">Selected Pokémon</p>
            <p className="mb-4 text-lg font-semibold capitalize text-accent">
              {selected ? selected.name : '—'}
            </p>

            <button
              onClick={handleFight}
              disabled={loading || !selected}
              className="w-full rounded-lg bg-accent py-2 text-sm font-semibold text-black transition-all duration-200 hover:scale-[1.02] hover:bg-accent-hover hover:shadow-md hover:shadow-accent/30 disabled:opacity-50 disabled:hover:scale-100"
            >
              {loading ? 'Fighting…' : 'Fight!'}
            </button>
          </div>

          <p className="mt-4 text-center text-sm text-muted">
            Wins: {wins} / {battles} battles
          </p>
        </div>

        {/* Preview card (right) */}
        <div className="order-3 w-full lg:w-56">
          {preview && (
            <div className="card-hover overflow-hidden rounded-2xl border border-border bg-surface">
              <div className="card-top-bar" />
              <div className="flex flex-col items-center p-4">
                <Image
                  src={preview.sprite}
                  alt={preview.name}
                  width={96}
                  height={96}
                  className="h-24 w-24 object-contain"
                />
                <p className="mt-2 text-xs font-semibold text-accent">
                  #{String(preview.id).padStart(3, '0')}
                </p>
                <h2 className="mt-1 text-base font-semibold capitalize text-ink">
                  {preview.name}
                </h2>
                <div className="mt-2 flex gap-1">
                  {preview.types.map((type) => (
                    <span
                      key={type}
                      className={`rounded-full px-2 py-0.5 text-xs font-medium capitalize ${TYPE_COLORS[type] ?? 'bg-neutral-500/15 text-neutral-300 ring-1 ring-neutral-500/30'}`}
                    >
                      {type}
                    </span>
                  ))}
                </div>
                <div className="mt-3 grid w-full grid-cols-2 gap-1 rounded-lg bg-surface-hover/80 p-2 text-xs text-muted ring-1 ring-border">
                  <span>HP: {preview.hp}</span>
                  <span>ATK: {preview.attack}</span>
                  <span>DEF: {preview.defense}</span>
                  <span>SPD: {preview.speed}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {result && selected && opponent && (
        <div className="mx-auto mt-6 max-w-md rounded-2xl border border-border bg-surface p-6 text-center shadow-lg shadow-black/20">
          <h2 className="flex items-center justify-center gap-2 text-xl font-bold text-ink">
            {result.winner === 'attacker' ? (
              <>
                <span className="text-accent">You won!</span>
                <Image src="/pikachu-emoji.png" alt="" width={28} height={28} />
              </>
            ) : (
              <>
                <span>You lost!</span>
                <Image src="/pikachu-sad.png" alt="" width={28} height={28} />
              </>
            )}
          </h2>

          <div className="mt-4 flex items-center justify-center gap-8">
            <div className="flex flex-col items-center">
              <Image src={selected.sprite} alt={selected.name} width={80} height={80} />
              <p className="mt-1 text-sm font-medium capitalize text-ink">{selected.name}</p>
              <p className="text-xs text-muted">Power: {result.attackerPower}</p>
            </div>
            <span className="text-muted">vs</span>
            <div className="flex flex-col items-center">
              <Image src={opponent.sprite} alt={opponent.name} width={80} height={80} />
              <p className="mt-1 text-sm font-medium capitalize text-ink">{opponent.name}</p>
              <p className="text-xs text-muted">Power: {result.defenderPower}</p>
            </div>
          </div>

          {result.winner === 'attacker' && !submitted && (
            <div className="mt-6 flex flex-col items-center gap-2">
              <p className="text-sm text-muted">Save your score to the leaderboard:</p>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Your name"
                maxLength={24}
                className="w-48 rounded-lg border border-border bg-surface-hover p-2 text-sm text-ink placeholder:text-muted focus:border-accent focus:outline-none"
              />
              <button
                onClick={handleSubmitScore}
                className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-black transition-all duration-200 hover:scale-105 hover:bg-accent-hover"
              >
                Submit score ({wins * SCORE_PER_WIN} pts)
              </button>
            </div>
          )}

          {submitted && <p className="mt-4 text-sm text-accent">Score saved!</p>}
        </div>
      )}
    </div>
  );
}