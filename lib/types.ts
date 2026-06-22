import { z } from 'zod';

export const PokemonSummarySchema = z.object({
  id: z.number().int().min(1),
  name: z.string(),
  types: z.array(z.string()).min(1).max(2),
  sprite: z.string(),
  hp: z.number().int().nonnegative(),
  attack: z.number().int().nonnegative(),
  defense: z.number().int().nonnegative(),
  speed: z.number().int().nonnegative(),
});
export type PokemonSummary = z.infer<typeof PokemonSummarySchema>;

export const SubmitScoreSchema = z.object({
  username: z.string().min(1).max(24),
  score: z.number().int().nonnegative().max(1_000_000),
});
export type SubmitScoreInput = z.infer<typeof SubmitScoreSchema>;
