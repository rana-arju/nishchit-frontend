import { Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const COURIERS = ["SteadFast Courier", "Pathao Courier", "RedX Delivery"];

export default function CouriersPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Couriers</h1>
        <p className="text-muted-foreground text-sm">
          Connect a courier to book and track deliveries in one click.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {COURIERS.map((courier) => (
          <Card key={courier}>
            <CardContent className="flex items-center gap-3">
              <span className="bg-muted text-muted-foreground grid size-10 shrink-0 place-items-center rounded-xl">
                <Truck className="size-4.5" aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{courier}</p>
                <p className="text-muted-foreground text-xs">Not connected</p>
              </div>
              <Button size="sm" variant="outline" disabled>
                Connect
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
