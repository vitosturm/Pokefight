import { PokemonSummarySchema, type PokemonSummary } from './types';

const BASE = 'https://pokeapi.co/api/v2';

export function spriteUrl(id: number): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}

interface RawStat {
  base_stat: number;
  stat: { name: string };
}
interface RawType {
  type: { name: string };
}
interface RawPokemon {
  id: number;
  name: string;
  types: RawType[];
  stats: RawStat[];
}

export async function getPokemon(id: number): Promise<PokemonSummary> {
  const res = await fetch(`${BASE}/pokemon/${id}`, { next: { revalidate: 86400 } });
  if (!res.ok) throw new Error(`PokeAPI error ${res.status}`);
  const raw: RawPokemon = await res.json();

  const getStat = (name: string) =>
    raw.stats.find((s) => s.stat.name === name)?.base_stat ?? 0;

  return PokemonSummarySchema.parse({
    id: raw.id,
    name: raw.name,
    types: raw.types.map((t) => t.type.name),
    sprite: spriteUrl(raw.id),
    hp: getStat('hp'),
    attack: getStat('attack'),
    defense: getStat('defense'),
    speed: getStat('speed'),
  });
}

export async function getFirstGenPokemon(limit = 20): Promise<PokemonSummary[]> {
  const ids = Array.from({ length: limit }, (_, i) => i + 1);
  const results = await Promise.all(ids.map((id) => getPokemon(id)));
  return results;
}
