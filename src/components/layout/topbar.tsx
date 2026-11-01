"use client";

import { usePathname } from "next/navigation";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { allDashboardNavItems } from "@/features/dashboard/nav-items";

export function Topbar() {
  const pathname = usePathname();
  const activeItem = allDashboardNavItems.find((item) => item.href === pathname);

  return (
    <header className="bg-background/80 sticky top-0 z-10 flex h-14 items-center gap-2 border-b px-4 backdrop-blur">
      <SidebarTrigger />
      <Separator orientation="vertical" className="h-5" />
      <span className="text-sm font-medium">{activeItem?.label ?? "Dashboard"}</span>
      <div className="ml-auto flex items-center gap-2">
        <ThemeToggle />
      </div>
    </header>
  );
}
