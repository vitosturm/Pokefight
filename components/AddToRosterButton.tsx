'use client';

import { useEffect, useState } from 'react';
import { addToRoster, isInRoster, ROSTER_MAX, getRoster } from '@/lib/roster';
import type { PokemonSummary } from '@/lib/types';

export default function AddToRosterButton({ pokemon }: { pokemon: PokemonSummary }) {
  const [added, setAdded] = useState(false);
  const [full, setFull] = useState(false);

  useEffect(() => {
    setAdded(isInRoster(pokemon.id));
    setFull(getRoster().length >= ROSTER_MAX);
  }, [pokemon.id]);

  function handleClick() {
    const updated = addToRoster(pokemon);
    setAdded(updated.some((p) => p.id === pokemon.id));
    setFull(updated.length >= ROSTER_MAX);
  }

  if (added) {
    return (
      <button
        disabled
        className="rounded-lg bg-green-100 px-4 py-2 text-sm font-medium text-green-700"
      >
        Added to roster
      </button>
    );
  }

  if (full) {
    return (
      <button
        disabled
        className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-400"
      >
        Roster full ({ROSTER_MAX} max)
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
    >
      Add to Roster
    </button>
  );
}
