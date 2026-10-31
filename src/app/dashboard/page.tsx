import { HealthStatusCard } from "@/features/dashboard/components/health-status-card";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Overview</h1>
        <p className="text-muted-foreground text-sm">Welcome back to Nishchit.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <HealthStatusCard />
      </div>
    </div>
  );
}
