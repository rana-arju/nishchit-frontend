"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { dashboardFooterNavItems, dashboardNavGroups } from "@/features/dashboard/nav-items";
import { NavUser } from "@/components/layout/nav-user";

const navButtonClass =
  "h-9 gap-2.5 rounded-lg px-2.5 text-[13.5px] font-medium text-foreground/70 data-active:bg-primary data-active:text-primary-foreground data-active:font-semibold data-active:shadow-sm hover:bg-sidebar-accent hover:text-foreground [&_svg]:size-[18px]";

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <Link href="/dashboard" className="flex items-center gap-2 px-2 py-1.5">
          <span className="bg-gradient-brand size-6 rounded-md" aria-hidden="true" />
          <span className="font-semibold tracking-tight group-data-[collapsible=icon]:hidden">
            Nishchit
          </span>
        </Link>
      </SidebarHeader>
      <SidebarContent className="gap-3">
        {dashboardNavGroups.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel className="text-[11px] font-semibold tracking-wide text-muted-foreground/80 uppercase">
              {group.label}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="gap-0.5">
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      isActive={pathname === item.href}
                      tooltip={item.label}
                      className={navButtonClass}
                      render={
                        <Link href={item.href}>
                          <item.icon strokeWidth={2.25} />
                          <span>{item.label}</span>
                        </Link>
                      }
                    />
                    {item.badge && (
                      <SidebarMenuBadge className="text-primary bg-primary/10 font-semibold">
                        {item.badge}
                      </SidebarMenuBadge>
                    )}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu className="gap-0.5">
          {dashboardFooterNavItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                isActive={pathname === item.href}
                tooltip={item.label}
                className={navButtonClass}
                render={
                  <Link href={item.href}>
                    <item.icon strokeWidth={2.25} />
                    <span>{item.label}</span>
                  </Link>
                }
              />
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
