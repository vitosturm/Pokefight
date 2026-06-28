import { getFirstGenPokemon } from '@/lib/pokeapi';
import PokemonCard from '@/components/PokemonCard';

export default async function HomePage() {
  const pokemon = await getFirstGenPokemon(20);

  return (
    <div>
      <section className="relative mb-10 overflow-hidden rounded-2xl border border-accent/20 bg-gradient-to-br from-accent/15 via-accent/5 to-transparent px-6 py-12 text-center sm:py-16">
        <img
          src="/hero.jpg"
          alt="Hero image"
          className="absolute inset-0 h-full w-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-bg/40 via-bg/60 to-bg/90" />

        <div className="relative">
          <h1 className="text-4xl font-extrabold tracking-tight text-ink drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)] sm:text-5xl">
            Dive into epic <span className="text-accent">Pokémon battles</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-ink/80 drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
            Catch, train and battle your favorite Pokémon. Build your roster, climb the
            leaderboard, and prove you're the best trainer around.
          </p>
        </div>
      </section>

      <h2 className="mb-2 text-3xl font-bold text-ink">
        Choose your <span className="text-accent">Pokémon.</span>
      </h2>
      <p className="mb-6 text-muted">
        Browse Gen 1 Pokémon, view their details and build your roster.
      </p>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {pokemon.map((p) => (
          <PokemonCard key={p.id} pokemon={p} />
        ))}
      </div>
    </div>
  );
}