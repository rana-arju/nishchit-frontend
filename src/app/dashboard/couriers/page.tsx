import { CouriersView } from "@/features/couriers/components/couriers-view";

export default function CouriersPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Couriers</h1>
        <p className="text-muted-foreground text-sm">
          Connect a courier to book and track deliveries in one click.
        </p>
      </div>
      <CouriersView />
    </div>
  );
}
