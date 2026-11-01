import { ShieldAlert } from "lucide-react";
import { EmptyState } from "@/features/dashboard/components/empty-state";

export default function RiskPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Risk & Returns</h1>
        <p className="text-muted-foreground text-sm">
          Orders flagged as likely fake or high-return will show up here before you ship them.
        </p>
      </div>
      <EmptyState
        icon={ShieldAlert}
        title="No risk alerts yet"
        description="As orders come in, Nishchit scores each one for fake or return risk so you can decide before shipping."
      />
    </div>
  );
}
