import { LeadsBoard } from "@/features/dashboard/components/leads-board";

export default function LeadsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Leads</h1>
        <p className="text-muted-foreground text-sm">
          Track interested customers from first message to confirmed order.
        </p>
      </div>
      <LeadsBoard />
    </div>
  );
}
