import { getFirstGenPokemon } from '@/lib/pokeapi';
import PokemonCard from '@/components/PokemonCard';

export default async function HomePage() {
  const pokemon = await getFirstGenPokemon(20);

  return (
    <div>
      <h1 className="mb-2 text-3xl font-bold">Pokémon</h1>
      <p className="mb-6 text-gray-500">
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
