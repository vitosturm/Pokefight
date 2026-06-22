import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-red-600 text-white shadow-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-2xl font-bold tracking-wide">
          Pokefight
        </Link>
        <ul className="flex gap-6 text-sm font-medium">
          <li>
            <Link href="/" className="hover:underline">
              Home
            </Link>
          </li>
          <li>
            <Link href="/roster" className="hover:underline">
              My Roster
            </Link>
          </li>
          <li>
            <Link href="/battle" className="hover:underline">
              Battle
            </Link>
          </li>
          <li>
            <Link href="/leaderboard" className="hover:underline">
              Leaderboard
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
