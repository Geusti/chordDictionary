type HeroSectionProps = {
  title: string;
  subtitle: string;
  tag: string;
};

export default function HeroSection({ title, subtitle, tag }: HeroSectionProps) {
  return (
    <header className="text-center space-y-4">
      <div className="inline-block px-4 py-1 rounded-full border border-tertiary/30 bg-tertiary/5 text-tertiary text-xs font-bold tracking-widest uppercase">
        {tag}
      </div>
      <h2 className="text-4xl font-bold text-white leading-tight">{title}</h2>
      <p className="text-on-surface-variant text-lg italic tracking-wide">
        {subtitle}
      </p>
    </header>
  );
}
