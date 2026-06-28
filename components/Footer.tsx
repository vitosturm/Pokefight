export default function Footer() {
  return (
    <footer className="mt-auto border-t border-white/10 bg-bg py-6 text-center text-sm text-muted">
      <p>
        Poké<span className="text-accent">fight</span> &copy; {new Date().getFullYear()} &mdash;
        Powered by PokeAPI
      </p>
    </footer>
  );
}
