"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { ComponentProps, MouseEvent } from "react";

export const SCROLL_TARGET_KEY = "nishchit:scroll-target";

function sectionIdFrom(href: string): string | null {
  const hashIndex = href.indexOf("#");
  if (hashIndex === -1) return null;
  const pathPart = href.slice(0, hashIndex);
  if (pathPart !== "" && pathPart !== "/") return null;
  return href.slice(hashIndex + 1) || null;
}

/**
 * A nav link that may point to a section on the home page (e.g. "/#features").
 * Clicking it never leaves "#section" in the address bar: it scrolls directly
 * when already on the home page, or stores the target and navigates to a
 * bare "/" otherwise, letting ScrollToSection finish the scroll on mount.
 */
export function AnchorLink({ href, onClick, ...props }: ComponentProps<typeof Link>) {
  const pathname = usePathname();
  const router = useRouter();
  const sectionId = typeof href === "string" ? sectionIdFrom(href) : null;

  if (!sectionId) {
    return <Link href={href} onClick={onClick} {...props} />;
  }

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    onClick?.(event);

    if (pathname === "/") {
      document.getElementById(sectionId as string)?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    sessionStorage.setItem(SCROLL_TARGET_KEY, sectionId as string);
    router.push("/");
  }

  return <Link href="/" onClick={handleClick} {...props} />;
}
