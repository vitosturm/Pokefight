import Image from 'next/image';
import Link from 'next/link';
import type { PokemonSummary } from '@/lib/types';
import { TYPE_COLORS } from '@/lib/typeColors';

export default function PokemonCard({ pokemon }: { pokemon: PokemonSummary }) {
  return (
    <Link href={`/pokemon/${pokemon.id}`}>
      <div className="flex cursor-pointer flex-col items-center rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md">
        <Image
          src={pokemon.sprite}
          alt={pokemon.name}
          width={96}
          height={96}
          className="h-24 w-24 object-contain"
        />
        <p className="mt-2 text-xs font-medium text-gray-400">#{String(pokemon.id).padStart(3, '0')}</p>
        <h2 className="mt-1 text-base font-semibold capitalize text-gray-800">{pokemon.name}</h2>
        <div className="mt-2 flex gap-1">
          {pokemon.types.map((type) => (
            <span
              key={type}
              className={`rounded-full px-2 py-0.5 text-xs font-medium capitalize ${TYPE_COLORS[type] ?? 'bg-gray-100 text-gray-600'}`}
            >
              {type}
            </span>
          ))}
        </div>
        <div className="mt-3 grid w-full grid-cols-2 gap-1 text-xs text-gray-500">
          <span>HP: {pokemon.hp}</span>
          <span>ATK: {pokemon.attack}</span>
          <span>DEF: {pokemon.defense}</span>
          <span>SPD: {pokemon.speed}</span>
        </div>
      </div>
    </Link>
  );
}
