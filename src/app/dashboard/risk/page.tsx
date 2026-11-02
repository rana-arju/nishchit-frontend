import { RiskView } from "@/features/risk/components/risk-view";

export default function RiskPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Risk & Returns</h1>
        <p className="text-muted-foreground text-sm">
          Orders flagged as likely fake or high-return will show up here before you ship them.
        </p>
      </div>
      <RiskView />
    </div>
  );
}
