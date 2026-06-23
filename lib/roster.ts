import type { PokemonSummary } from './types';

const STORAGE_KEY = 'pokefight:roster';
const MAX_ROSTER_SIZE = 6;

export function getRoster(): PokemonSummary[] {
  if (typeof window === 'undefined') return [];
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as PokemonSummary[];
  } catch {
    return [];
  }
}

function saveRoster(roster: PokemonSummary[]): void {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(roster));
}

export function addToRoster(pokemon: PokemonSummary): PokemonSummary[] {
  const roster = getRoster();
  if (roster.some((p) => p.id === pokemon.id)) return roster;
  if (roster.length >= MAX_ROSTER_SIZE) return roster;

  const updated = [...roster, pokemon];
  saveRoster(updated);
  return updated;
}

export function removeFromRoster(id: number): PokemonSummary[] {
  const updated = getRoster().filter((p) => p.id !== id);
  saveRoster(updated);
  return updated;
}

export function isInRoster(id: number): boolean {
  return getRoster().some((p) => p.id === id);
}

export const ROSTER_MAX = MAX_ROSTER_SIZE;
