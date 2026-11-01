import {
  Bot,
  ClipboardList,
  FolderTree,
  Inbox,
  LayoutDashboard,
  type LucideIcon,
  Package,
  Settings,
  Share2,
  ShieldAlert,
  Truck,
  UserPlus,
} from "lucide-react";

type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  badge?: string;
};

export const dashboardNavGroups: { label: string; items: NavItem[] }[] = [
  {
    label: "Workspace",
    items: [
      { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
      { href: "/dashboard/inbox", label: "Unified Inbox", icon: Inbox },
      { href: "/dashboard/orders", label: "Orders", icon: ClipboardList },
      { href: "/dashboard/leads", label: "Leads", icon: UserPlus },
      { href: "/dashboard/risk", label: "Risk & Returns", icon: ShieldAlert },
    ],
  },
  {
    label: "Catalog",
    items: [
      { href: "/dashboard/products", label: "Products", icon: Package },
      { href: "/dashboard/categories", label: "Categories", icon: FolderTree },
    ],
  },
  {
    label: "Automation",
    items: [{ href: "/dashboard/chatbot", label: "AI Chatbot", icon: Bot, badge: "AI" }],
  },
  {
    label: "Integrations",
    items: [
      { href: "/dashboard/couriers", label: "Couriers", icon: Truck },
      { href: "/dashboard/facebook", label: "Facebook Connect", icon: Share2 },
    ],
  },
];

export const dashboardFooterNavItems: NavItem[] = [
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export const dashboardNavItems: NavItem[] = dashboardNavGroups.flatMap((group) => group.items);
export const allDashboardNavItems: NavItem[] = [...dashboardNavItems, ...dashboardFooterNavItems];
