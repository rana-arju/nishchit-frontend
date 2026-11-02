import type { LucideIcon } from "lucide-react";
import { AlertTriangle, MessageCircle, PackageCheck, Undo2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "cn";
import type { ActivityType, RecentActivityItem } from "@/features/dashboard/schemas/overview";

type RecentActivityProps = {
  items: RecentActivityItem[];
};

const activityIcon: Record<ActivityType, LucideIcon> = {
  order: PackageCheck,
  risk: AlertTriangle,
  return: Undo2,
  message: MessageCircle,
};

const activityIconClassName: Record<ActivityType, string> = {
  order: "bg-accent text-accent-foreground",
  risk: "bg-destructive/10 text-destructive",
  return: "bg-chart-3/15 text-chart-3",
  message: "bg-muted text-muted-foreground",
};

function formatRelativeTime(timestamp: string): string {
  const diffMs = Date.now() - new Date(timestamp).getTime();
  const diffMinutes = Math.round(diffMs / 60_000);

  if (diffMinutes < 1) return "এইমাত্র";
  if (diffMinutes < 60) return `${diffMinutes} মিনিট আগে`;

  const diffHours = Math.round(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours} ঘণ্টা আগে`;

  const diffDays = Math.round(diffHours / 24);
  return `${diffDays} দিন আগে`;
}

export function RecentActivity({ items }: RecentActivityProps) {
  return (
    <Card className="border-transparent shadow-sm ring-1">
      <CardHeader>
        <CardTitle className="font-bangla">সাম্প্রতিক কাজ</CardTitle>
      </CardHeader>
      <CardContent>
        {items.length === 0 ? (
          <p className="text-muted-foreground font-bangla text-sm">কোনো সাম্প্রতিক কাজ নেই।</p>
        ) : (
          <ul className="divide-border -mx-(--card-spacing) flex flex-col divide-y">
            {items.map((item) => {
              const Icon = activityIcon[item.type];
              return (
                <li
                  key={item.id}
                  className="hover:bg-muted/50 flex items-start gap-3 px-(--card-spacing) py-3 transition-colors"
                >
                  <div
                    className={cn("shrink-0 rounded-full p-2", activityIconClassName[item.type])}
                  >
                    <Icon className="size-4" />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                    <p className="font-bangla truncate text-sm font-medium">{item.title}</p>
                    <p className="font-bangla text-muted-foreground truncate text-xs">
                      {item.description}
                    </p>
                  </div>
                  <span className="text-muted-foreground font-bangla shrink-0 text-xs whitespace-nowrap">
                    {formatRelativeTime(item.timestamp)}
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
