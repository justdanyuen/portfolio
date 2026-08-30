export default function NavFadeMask() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-40 h-28 bg-gradient-to-b from-[var(--background)]/55 via-[var(--background)]/25 to-transparent"
    />
  );
}