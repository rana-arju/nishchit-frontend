import Link from "next/link";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { buttonVariants } from "@/components/ui/button";
import { marketingContent } from "@/features/marketing/content";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { brand, navigation } = marketingContent;

  return (
    <header className="bg-background/85 sticky top-0 z-50 border-b backdrop-blur-xl">
      <nav
        className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6"
        aria-label={navigation.primaryLabel}
      >
        <Link
          href="/"
          className="focus-visible:ring-ring flex items-center gap-2 rounded-md font-semibold tracking-tight outline-none focus-visible:ring-2"
        >
          <span className="bg-gradient-brand size-7 rounded-lg" aria-hidden="true" />
          {brand}
        </Link>
        <div className="mx-auto hidden items-center gap-7 md:flex">
          {navigation.links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-muted-foreground hover:text-foreground focus-visible:ring-ring rounded-sm text-sm transition-colors outline-none focus-visible:ring-2"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="ml-auto flex items-center gap-1 sm:gap-2 md:ml-0">
          <ThemeToggle />
          <Link href="/login" className={buttonVariants({ variant: "ghost", size: "sm" })}>
            {navigation.login}
          </Link>
          <Link
            href="/register"
            className={cn(
              buttonVariants({ size: "sm" }),
              "bg-gradient-brand text-primary-foreground hover:opacity-90",
            )}
          >
            {navigation.start}
          </Link>
        </div>
      </nav>
    </header>
  );
}
