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
      <Link href="/" className="text-sm text-accent transition-colors hover:text-accent-hover">
        &larr; Back to all Pokémon
      </Link>

      <div className="mt-4 flex flex-col items-center rounded-2xl border border-border bg-surface p-8 shadow-lg shadow-black/20">
        <Image
          src={pokemon.sprite}
          alt={pokemon.name}
          width={180}
          height={180}
          className="h-44 w-44 object-contain"
        />
        <p className="mt-2 text-sm font-medium text-muted">
          #{String(pokemon.id).padStart(3, '0')}
        </p>
        <h1 className="mt-1 text-3xl font-bold capitalize text-ink">{pokemon.name}</h1>

        <div className="mt-3 flex gap-2">
          {pokemon.types.map((type) => (
            <span
              key={type}
              className={`rounded-full px-3 py-1 text-sm font-medium capitalize ${TYPE_COLORS[type] ?? 'bg-neutral-500/15 text-neutral-300 ring-1 ring-neutral-500/30'}`}
            >
              {type}
            </span>
          ))}
        </div>

        <dl className="mt-6 grid w-full grid-cols-2 gap-4 text-sm sm:grid-cols-4">
          <div className="rounded-lg border border-border bg-surface-hover p-3 text-center">
            <dt className="text-muted">HP</dt>
            <dd className="text-lg font-semibold text-ink">{pokemon.hp}</dd>
          </div>
          <div className="rounded-lg border border-border bg-surface-hover p-3 text-center">
            <dt className="text-muted">Attack</dt>
            <dd className="text-lg font-semibold text-ink">{pokemon.attack}</dd>
          </div>
          <div className="rounded-lg border border-border bg-surface-hover p-3 text-center">
            <dt className="text-muted">Defense</dt>
            <dd className="text-lg font-semibold text-ink">{pokemon.defense}</dd>
          </div>
          <div className="rounded-lg border border-border bg-surface-hover p-3 text-center">
            <dt className="text-muted">Speed</dt>
            <dd className="text-lg font-semibold text-ink">{pokemon.speed}</dd>
          </div>
        </dl>

        <div className="mt-8">
          <AddToRosterButton pokemon={pokemon} />
        </div>
      </div>
    </div>
  );
}