type AccentBlockProps = {
  color: string;
  title: string;
  subtitle: string;
};

export default function AccentBlock({ color, title, subtitle }: AccentBlockProps) {
  return (
    <div
      className="py-1 pl-3 mb-3 last:mb-0"
      style={{ borderLeft: `3px solid ${color}` }}
    >
      <p
        className="font-sans text-sm font-medium"
        style={{ color }}
      >
        {title}
      </p>
      <p className="mt-0.5 text-xs text-foreground/70">
        {subtitle}
      </p>
    </div>
  );
}
