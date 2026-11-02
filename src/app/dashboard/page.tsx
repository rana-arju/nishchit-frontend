import { OverviewDashboard } from "@/features/dashboard/components/overview-dashboard";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Overview</h1>
        <p className="text-muted-foreground text-sm">Welcome back to Nishchit.</p>
      </div>
      <OverviewDashboard />
    </div>
  );
}
