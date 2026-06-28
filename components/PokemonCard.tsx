import Image from 'next/image';
import Link from 'next/link';
import type { PokemonSummary } from '@/lib/types';
import { TYPE_COLORS } from '@/lib/typeColors';

export default function PokemonCard({ pokemon }: { pokemon: PokemonSummary }) {
  return (
    <Link href={`/pokemon/${pokemon.id}`}>
      <div className="card-hover overflow-hidden rounded-2xl border border-border bg-surface">
        <div className="card-top-bar" />
        <div className="flex flex-col items-center p-4">
          <div className="overflow-hidden">
            <Image
              src={pokemon.sprite}
              alt={pokemon.name}
              width={96}
              height={96}
              className="sprite-zoom h-24 w-24 object-contain"
            />
          </div>
          <p className="mt-2 text-xs font-semibold text-accent">
            #{String(pokemon.id).padStart(3, '0')}
          </p>
          <h2 className="mt-1 text-base font-semibold capitalize text-ink">{pokemon.name}</h2>
          <div className="mt-2 flex gap-1">
            {pokemon.types.map((type) => (
              <span
                key={type}
                className={`rounded-full px-2 py-0.5 text-xs font-medium capitalize ${TYPE_COLORS[type] ?? 'bg-neutral-500/15 text-neutral-300 ring-1 ring-neutral-500/30'}`}
              >
                {type}
              </span>
            ))}
          </div>
          <div className="mt-3 grid w-full grid-cols-2 gap-1 rounded-lg bg-surface-hover/80 p-2 text-xs text-muted ring-1 ring-border">
            <span>HP: {pokemon.hp}</span>
            <span>ATK: {pokemon.attack}</span>
            <span>DEF: {pokemon.defense}</span>
            <span>SPD: {pokemon.speed}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}