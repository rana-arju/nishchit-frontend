export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mx-auto mb-10 max-w-2xl text-center md:mb-14">
      <p className="text-primary mb-3 text-sm font-semibold">{eyebrow}</p>
      <h2 className="text-3xl leading-tight font-semibold tracking-tight md:text-4xl">{title}</h2>
      {description && <p className="text-muted-foreground mt-4 leading-7">{description}</p>}
    </div>
  );
}
