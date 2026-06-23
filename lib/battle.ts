import type { PokemonSummary } from './types';

const TYPE_ADVANTAGE: Record<string, string[]> = {
  fire: ['grass', 'bug', 'ice'],
  water: ['fire', 'rock', 'ground'],
  grass: ['water', 'ground', 'rock'],
  electric: ['water', 'flying'],
  ice: ['grass', 'ground', 'flying'],
  rock: ['fire', 'ice', 'flying', 'bug'],
  ground: ['fire', 'electric', 'rock'],
  fighting: ['normal', 'rock', 'ice'],
  psychic: ['fighting', 'poison'],
  ghost: ['psychic', 'ghost'],
  dragon: ['dragon'],
};

const ADVANTAGE_MULTIPLIER = 1.2;

function hasTypeAdvantage(attackerTypes: string[], defenderTypes: string[]): boolean {
  return attackerTypes.some((attackerType) =>
    TYPE_ADVANTAGE[attackerType]?.some((weakType) => defenderTypes.includes(weakType)),
  );
}

function powerOf(pokemon: PokemonSummary): number {
  return pokemon.attack + pokemon.defense + pokemon.speed;
}

export interface BattleResult {
  winner: 'attacker' | 'defender';
  attackerPower: number;
  defenderPower: number;
}

export function resolveBattle(
  attacker: PokemonSummary,
  defender: PokemonSummary,
): BattleResult {
  let attackerPower = powerOf(attacker);
  let defenderPower = powerOf(defender);

  if (hasTypeAdvantage(attacker.types, defender.types)) {
    attackerPower *= ADVANTAGE_MULTIPLIER;
  }
  if (hasTypeAdvantage(defender.types, attacker.types)) {
    defenderPower *= ADVANTAGE_MULTIPLIER;
  }

  return {
    winner: attackerPower >= defenderPower ? 'attacker' : 'defender',
    attackerPower: Math.round(attackerPower),
    defenderPower: Math.round(defenderPower),
  };
}
