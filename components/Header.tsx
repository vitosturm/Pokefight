'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/battle', label: 'Battle' },
  { href: '/roster', label: 'My Roster' },
  { href: '/leaderboard', label: 'Leaderboard' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="glass-header sticky top-0 z-50 border-b border-accent/10 shadow-lg shadow-black/20">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-ink"
          onClick={() => setOpen(false)}
        >
          Poké<span className="text-accent">fight</span>
        </Link>

        <ul className="hidden gap-8 text-sm font-medium sm:flex">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`transition-colors hover:text-accent ${
                    active ? 'text-accent' : 'text-muted'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden sm:block">
          <Link
            href="/battle"
            className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-black transition-all duration-200 hover:scale-105 hover:bg-accent-hover hover:shadow-md hover:shadow-accent/30"
          >
            Start Battle
          </Link>
        </div>

        <button
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 rounded-lg border border-border transition-colors hover:border-accent sm:hidden"
        >
          <span
            className={`h-0.5 w-5 bg-ink transition-transform ${open ? 'translate-y-2 rotate-45' : ''}`}
          />
          <span className={`h-0.5 w-5 bg-ink transition-opacity ${open ? 'opacity-0' : ''}`} />
          <span
            className={`h-0.5 w-5 bg-ink transition-transform ${open ? '-translate-y-2 -rotate-45' : ''}`}
          />
        </button>
      </nav>

      {open && (
        <div className="glass-header border-t border-accent/10 px-4 pb-4 sm:hidden">
          <ul className="flex flex-col gap-3 pt-3 text-sm font-medium">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`block transition-colors hover:text-accent ${
                      active ? 'text-accent' : 'text-muted'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <Link
            href="/battle"
            onClick={() => setOpen(false)}
            className="mt-4 block rounded-lg bg-accent px-4 py-2 text-center text-sm font-semibold text-black transition-all duration-200 hover:bg-accent-hover"
          >
            Start Battle
          </Link>
        </div>
      )}
    </header>
  );
}