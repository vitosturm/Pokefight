'use server';

import { getPokemon } from './pokeapi';
import type { PokemonSummary } from './types';

const GEN1_MAX_ID = 151;

export async function getRandomOpponent(): Promise<PokemonSummary> {
  const randomId = Math.floor(Math.random() * GEN1_MAX_ID) + 1;
  return getPokemon(randomId);
}
