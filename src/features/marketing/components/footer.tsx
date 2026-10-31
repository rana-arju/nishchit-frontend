import Link from "next/link";
import { marketingContent } from "@/features/marketing/content";

export function Footer() {
  const { brand, navigation, footer } = marketingContent;

  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-10 sm:px-6 md:flex-row md:items-end md:justify-between">
        <div>
          <Link
            href="/"
            className="focus-visible:ring-ring inline-flex items-center gap-2 rounded-md font-semibold outline-none focus-visible:ring-2"
          >
            <span className="bg-gradient-brand size-6 rounded-md" aria-hidden="true" />
            {brand}
          </Link>
          <p className="text-muted-foreground mt-3 max-w-sm text-sm leading-6">
            {footer.description}
          </p>
        </div>
        <div className="flex flex-col gap-4 md:items-end">
          <nav className="flex flex-wrap gap-x-5 gap-y-2" aria-label={navigation.footerLabel}>
            {navigation.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-muted-foreground hover:text-foreground focus-visible:ring-ring rounded-sm text-sm transition-colors outline-none focus-visible:ring-2"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <p className="text-muted-foreground text-xs">{footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
