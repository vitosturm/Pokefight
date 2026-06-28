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
        className="rounded-lg bg-accent/15 px-4 py-2 text-sm font-medium text-accent ring-1 ring-accent/30"
      >
        ✓ Added to roster
      </button>
    );
  }

  if (full) {
    return (
      <button
        disabled
        className="rounded-lg bg-surface-hover px-4 py-2 text-sm font-medium text-muted ring-1 ring-border"
      >
        Roster full ({ROSTER_MAX} max)
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-black transition-all duration-200 hover:scale-105 hover:bg-accent-hover hover:shadow-md hover:shadow-accent/30"
    >
      + Add to Roster
    </button>
  );
}