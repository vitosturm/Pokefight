import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPokemon } from '@/lib/pokeapi';
import { TYPE_COLORS } from '@/lib/typeColors';
import AddToRosterButton from '@/components/AddToRosterButton';

export default async function PokemonDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const pokemonId = Number(id);
  if (!Number.isInteger(pokemonId) || pokemonId < 1) notFound();

  const pokemon = await getPokemon(pokemonId);

  return (
    <div className="mx-auto max-w-2xl">
      <Link href="/" className="text-sm text-red-600 hover:underline">
        &larr; Back to all Pokémon
      </Link>

      <div className="mt-4 flex flex-col items-center rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
        <Image
          src={pokemon.sprite}
          alt={pokemon.name}
          width={180}
          height={180}
          className="h-44 w-44 object-contain"
        />
        <p className="mt-2 text-sm font-medium text-gray-400">
          #{String(pokemon.id).padStart(3, '0')}
        </p>
        <h1 className="mt-1 text-3xl font-bold capitalize">{pokemon.name}</h1>

        <div className="mt-3 flex gap-2">
          {pokemon.types.map((type) => (
            <span
              key={type}
              className={`rounded-full px-3 py-1 text-sm font-medium capitalize ${TYPE_COLORS[type] ?? 'bg-gray-100 text-gray-600'}`}
            >
              {type}
            </span>
          ))}
        </div>

        <dl className="mt-6 grid w-full grid-cols-2 gap-4 text-sm sm:grid-cols-4">
          <div className="rounded-lg bg-gray-50 p-3 text-center">
            <dt className="text-gray-400">HP</dt>
            <dd className="text-lg font-semibold">{pokemon.hp}</dd>
          </div>
          <div className="rounded-lg bg-gray-50 p-3 text-center">
            <dt className="text-gray-400">Attack</dt>
            <dd className="text-lg font-semibold">{pokemon.attack}</dd>
          </div>
          <div className="rounded-lg bg-gray-50 p-3 text-center">
            <dt className="text-gray-400">Defense</dt>
            <dd className="text-lg font-semibold">{pokemon.defense}</dd>
          </div>
          <div className="rounded-lg bg-gray-50 p-3 text-center">
            <dt className="text-gray-400">Speed</dt>
            <dd className="text-lg font-semibold">{pokemon.speed}</dd>
          </div>
        </dl>

        <div className="mt-8">
          <AddToRosterButton pokemon={pokemon} />
        </div>
      </div>
    </div>
  );
}
