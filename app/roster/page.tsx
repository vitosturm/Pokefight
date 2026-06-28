'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getRoster, removeFromRoster, ROSTER_MAX } from '@/lib/roster';
import { TYPE_COLORS } from '@/lib/typeColors';
import type { PokemonSummary } from '@/lib/types';

export default function RosterPage() {
  const [roster, setRoster] = useState<PokemonSummary[]>([]);

  useEffect(() => {
    setRoster(getRoster());
  }, []);

  function handleRemove(id: number) {
    setRoster(removeFromRoster(id));
  }

  if (roster.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-surface px-6 py-20 text-center">
        <h1 className="mb-2 text-3xl font-bold text-ink">My Roster</h1>
        <p className="mb-6 text-muted">
          You haven&apos;t added any Pokémon yet. Browse the Pokédex and add some to your roster.
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
    <div>
      <h1 className="mb-2 text-3xl font-bold text-ink">My Roster</h1>
      <p className="mb-6 text-muted">
        {roster.length} / {ROSTER_MAX} Pokémon
      </p>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {roster.map((pokemon) => (
          <div
            key={pokemon.id}
            className="card-hover overflow-hidden rounded-2xl border border-border bg-surface"
          >
            <div className="card-top-bar" />
            <div className="flex flex-col items-center p-4">
            <div className="overflow-hidden">
              <Image
                src={pokemon.sprite}
                alt={pokemon.name}
                width={96}
                height={96}
                className="sprite-zoom h-24 w-24 object-contain"
              />
            </div>
            <h2 className="mt-1 text-base font-semibold capitalize text-ink">{pokemon.name}</h2>
            <div className="mt-2 flex gap-1">
              {pokemon.types.map((type) => (
                <span
                  key={type}
                  className={`rounded-full px-2 py-0.5 text-xs font-medium capitalize ${TYPE_COLORS[type] ?? 'bg-neutral-500/15 text-neutral-300 ring-1 ring-neutral-500/30'}`}
                >
                  {type}
                </span>
              ))}
            </div>
            <button
              onClick={() => handleRemove(pokemon.id)}
              className="mt-3 text-xs font-medium text-muted transition-colors hover:text-accent"
            >
              Remove
            </button>
          </div>
          </div>
        ))}
      </div>
    </div>
  );
}