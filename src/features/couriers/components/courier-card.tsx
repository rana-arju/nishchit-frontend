import { CheckCircle2, ChevronDown, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { CourierDefinition } from "@/features/couriers/courier-data";
import { cn } from "cn";

function maskKey(apiKey: string): string {
  if (apiKey.length <= 4) return "••••";
  return `••••${apiKey.slice(-4)}`;
}

export function CourierCard({
  courier,
  apiKey,
  onConnect,
  onDisconnect,
}: {
  courier: CourierDefinition;
  apiKey: string | null;
  onConnect: () => void;
  onDisconnect: () => void;
}) {
  const isConnected = apiKey !== null;

  return (
    <Card className="border-transparent shadow-sm ring-1">
      <CardContent className="flex flex-col gap-3">
        <div className="flex items-start gap-3">
          <span
            className={cn(
              "grid size-11 shrink-0 place-items-center rounded-xl",
              courier.iconClassName,
            )}
          >
            <Truck className="size-5" aria-hidden="true" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">{courier.name}</p>
            <p className="font-bangla text-muted-foreground mt-0.5 text-xs leading-relaxed">
              {courier.description}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between gap-2 border-t pt-3">
          {isConnected ? (
            <span className="text-chart-4 inline-flex items-center gap-1.5 text-xs font-medium">
              <CheckCircle2 className="size-3.5" />
              <span className="font-bangla">সংযুক্ত</span>
              <span className="text-muted-foreground font-normal">· {maskKey(apiKey)}</span>
            </span>
          ) : (
            <span className="text-muted-foreground font-bangla text-xs">সংযুক্ত নয়</span>
          )}

          {isConnected ? (
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button size="sm" variant="outline">
                    পরিচালনা
                    <ChevronDown />
                  </Button>
                }
              />
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="font-bangla" onClick={onConnect}>
                  API তথ্য পরিবর্তন করুন
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="font-bangla"
                  variant="destructive"
                  onClick={onDisconnect}
                >
                  সংযোগ বিচ্ছিন্ন করুন
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button size="sm" className="font-bangla" onClick={onConnect}>
              কানেক্ট করুন
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
