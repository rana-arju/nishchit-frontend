import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function EmptyState({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) {
  return (
    <Card>
      <CardContent className="flex flex-col items-center gap-3 py-14 text-center">
        <span className="bg-muted text-muted-foreground grid size-12 place-items-center rounded-full">
          <Icon className="size-5.5" aria-hidden="true" />
        </span>
        <div>
          <p className="font-medium">{title}</p>
          <p className="text-muted-foreground mt-1 max-w-sm text-sm leading-6">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}
