import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const STAGES = ["New", "Contacted", "Qualified", "Lost"];

export function LeadsBoard() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {STAGES.map((stage) => (
        <Card key={stage} size="sm">
          <CardHeader className="flex flex-row items-center justify-between gap-2">
            <CardTitle className="text-sm">{stage}</CardTitle>
            <span className="bg-muted text-muted-foreground flex size-5 items-center justify-center rounded-full text-xs font-medium">
              0
            </span>
          </CardHeader>
          <CardContent>
            <div className="text-muted-foreground flex min-h-24 items-center justify-center rounded-lg border border-dashed text-xs">
              No leads
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
