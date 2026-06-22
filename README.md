# Pokefight

A Pokémon battle game built with Next.js, TypeScript, Tailwind CSS, and a Neon Postgres
database via Prisma. Pokémon data, sprites and cries come from [PokeAPI](https://pokeapi.co/).

## Quickstart

```bash
npm install
cp .env.example .env   # fill in DATABASE_URL
npx prisma migrate dev
npm run dev
```

## What's already set up

- Next.js App Router project with TypeScript and Tailwind CSS
- Prisma connected to Neon Postgres (`lib/prisma.ts`, `prisma/schema.prisma`)
- Basic `Leaderboard` model (player name, score, wins, battles)
- PokeAPI helper (`lib/pokeapi.ts`) for fetching Pokémon data, sprites and cries
- Shared types/validation in `lib/types.ts` (zod schemas)

## What's next

- Pokédex / roster pages, battle logic, type chart
- Leaderboard API routes (fetch + submit score) and the leaderboard page
- UI, styling, details page, theme, responsive layout

## Scripts

- `npm run dev` — local dev server
- `npm run build` / `npm start` — production
- `npm run lint` / `npm run format` — ESLint / Prettier
- `npm run typecheck` — TypeScript check
