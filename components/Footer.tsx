export default function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-200 bg-gray-50 py-6 text-center text-sm text-gray-500">
      <p>Pokefight &copy; {new Date().getFullYear()} &mdash; Powered by PokeAPI</p>
    </footer>
  );
}
