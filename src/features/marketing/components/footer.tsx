import Link from "next/link";
import { marketingContent } from "@/features/marketing/content";
import { AnchorLink } from "@/features/marketing/components/anchor-link";

export function Footer() {
  const { brand, navigation, footer } = marketingContent;

  return (
    <footer className="bg-background relative isolate overflow-hidden border-t">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr] lg:gap-8">
          <div>
            <Link
              href="/"
              className="focus-visible:ring-ring inline-flex items-center gap-2 rounded-md font-semibold tracking-tight outline-none focus-visible:ring-2"
            >
              <span className="bg-gradient-brand size-7 rounded-lg" aria-hidden="true" />
              {brand}
            </Link>
            <p className="text-muted-foreground mt-4 max-w-xs text-sm leading-6">
              {footer.description}
            </p>
          </div>

          <div>
            <h3 className="text-gradient-brand text-xs font-bold tracking-[0.14em] uppercase">
              {footer.productTitle}
            </h3>
            <nav className="mt-4 flex flex-col gap-3" aria-label={navigation.footerLabel}>
              {navigation.links.map((link) => (
                <AnchorLink
                  key={link.href}
                  href={link.href}
                  className="text-muted-foreground hover:text-foreground focus-visible:ring-ring w-fit rounded-sm text-sm transition-colors outline-none focus-visible:ring-2"
                >
                  {link.label}
                </AnchorLink>
              ))}
            </nav>
          </div>

          <div>
            <h3 className="text-gradient-brand text-xs font-bold tracking-[0.14em] uppercase">
              {footer.accountTitle}
            </h3>
            <nav className="mt-4 flex flex-col gap-3">
              <Link
                href="/login"
                className="text-muted-foreground hover:text-foreground focus-visible:ring-ring w-fit rounded-sm text-sm transition-colors outline-none focus-visible:ring-2"
              >
                {navigation.login}
              </Link>
              <Link
                href="/register"
                className="text-muted-foreground hover:text-foreground focus-visible:ring-ring w-fit rounded-sm text-sm transition-colors outline-none focus-visible:ring-2"
              >
                {navigation.start}
              </Link>
            </nav>
          </div>
        </div>
      </div>

      <div className="relative border-t">
        <p
          aria-hidden="true"
          className="text-gradient-brand pointer-events-none overflow-hidden text-center font-black whitespace-nowrap select-none"
          style={{ fontSize: "clamp(2.75rem, 15vw, 10rem)", lineHeight: 1, opacity: 0.12 }}
        >
          {brand}
        </p>

        <div className="mx-auto flex max-w-7xl flex-col items-center gap-2 px-4 pb-6 sm:flex-row sm:justify-center sm:px-6">
          <p className="text-muted-foreground text-center text-xs">{footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
