'use server';

import { prisma } from './prisma';
import { SubmitScoreSchema } from './types';

export interface LeaderboardRow {
  id: string;
  username: string;
  score: number;
  date: Date;
}

export async function getLeaderboard(): Promise<LeaderboardRow[]> {
  return prisma.leaderboard.findMany({
    orderBy: { score: 'desc' },
  });
}

export type SubmitScoreResult = { ok: true } | { ok: false; error: string };

export async function submitScore(input: unknown): Promise<SubmitScoreResult> {
  const parsed = SubmitScoreSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? 'Invalid input' };
  }

  await prisma.leaderboard.create({
    data: {
      username: parsed.data.username,
      score: parsed.data.score,
    },
  });

  return { ok: true };
}
