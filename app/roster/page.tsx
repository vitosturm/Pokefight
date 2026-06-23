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
      <div className="text-center">
        <h1 className="mb-2 text-3xl font-bold">My Roster</h1>
        <p className="mb-6 text-gray-500">
          You haven&apos;t added any Pokémon yet. Browse the Pokédex and add some to your roster.
        </p>
        <Link href="/" className="text-red-600 hover:underline">
          Go to Pokédex &rarr;
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-2 text-3xl font-bold">My Roster</h1>
      <p className="mb-6 text-gray-500">
        {roster.length} / {ROSTER_MAX} Pokémon
      </p>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {roster.map((pokemon) => (
          <div
            key={pokemon.id}
            className="flex flex-col items-center rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
          >
            <Image
              src={pokemon.sprite}
              alt={pokemon.name}
              width={96}
              height={96}
              className="h-24 w-24 object-contain"
            />
            <h2 className="mt-1 text-base font-semibold capitalize text-gray-800">
              {pokemon.name}
            </h2>
            <div className="mt-2 flex gap-1">
              {pokemon.types.map((type) => (
                <span
                  key={type}
                  className={`rounded-full px-2 py-0.5 text-xs font-medium capitalize ${TYPE_COLORS[type] ?? 'bg-gray-100 text-gray-600'}`}
                >
                  {type}
                </span>
              ))}
            </div>
            <button
              onClick={() => handleRemove(pokemon.id)}
              className="mt-3 text-xs font-medium text-red-600 hover:underline"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
