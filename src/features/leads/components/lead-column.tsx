import { useState, type DragEvent } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LeadCard } from "@/features/leads/components/lead-card";
import type { Lead } from "@/features/leads/schemas/lead";
import { pipelineStageLabel, type PipelineStage } from "@/types/pipeline-stage";
import { cn } from "cn";

const stageAccentClassName: Record<PipelineStage, string> = {
  new: "bg-chart-3",
  contacted: "bg-chart-1",
  interested: "bg-chart-2",
  follow_up: "bg-chart-5",
  qualified: "bg-chart-4",
  order_confirmed: "bg-chart-3",
  lost: "bg-muted-foreground",
};

export function LeadColumn({
  stage,
  leads,
  draggedLeadId,
  isDropTarget,
  onSelectLead,
  onDragStart,
  onDragEnd,
  onDragEnter,
  onDragLeave,
  onDrop,
}: {
  stage: PipelineStage;
  leads: Lead[];
  draggedLeadId: string | null;
  isDropTarget: boolean;
  onSelectLead: (leadId: string) => void;
  onDragStart: (leadId: string) => void;
  onDragEnd: () => void;
  onDragEnter: () => void;
  onDragLeave: () => void;
  onDrop: (leadId: string) => void;
}) {
  const [collapsed, setCollapsed] = useState(false);

  function handleDragLeave(event: DragEvent<HTMLElement>) {
    if (event.currentTarget.contains(event.relatedTarget as Node | null)) return;
    onDragLeave();
  }

  return (
    <Card
      size="sm"
      onDragOver={(event) => event.preventDefault()}
      onDragEnter={(event) => {
        event.preventDefault();
        onDragEnter();
      }}
      onDragLeave={handleDragLeave}
      onDrop={(event) => {
        event.preventDefault();
        onDrop(event.dataTransfer.getData("text/plain"));
      }}
      className={cn(
        "relative min-h-80 shrink-0 overflow-hidden transition-all duration-200",
        collapsed ? "w-14" : "w-72",
        isDropTarget && "border-primary bg-primary/5 ring-primary/20 ring-2",
      )}
    >
      <span className={cn("absolute inset-x-0 top-0 h-1", stageAccentClassName[stage])} />
      <CardHeader
        className={cn(
          "flex gap-2 pt-4",
          collapsed ? "flex-col items-center px-2" : "flex-row items-center justify-between",
        )}
      >
        <div className={cn("flex min-w-0 items-center gap-2", collapsed && "flex-col")}>
          <button
            type="button"
            onClick={() => setCollapsed((current) => !current)}
            className="text-muted-foreground hover:bg-muted hover:text-foreground grid size-6 shrink-0 place-items-center rounded-md transition-colors"
            aria-label={`${pipelineStageLabel[stage]} stage ${collapsed ? "expand" : "collapse"} করুন`}
          >
            {collapsed ? <ChevronRight className="size-4" /> : <ChevronLeft className="size-4" />}
          </button>
          <CardTitle
            className={cn(
              "font-bangla text-sm",
              collapsed && "rotate-180 whitespace-nowrap [writing-mode:vertical-rl]",
            )}
          >
            {pipelineStageLabel[stage]}
          </CardTitle>
        </div>
        <span className="bg-muted text-muted-foreground flex min-w-6 items-center justify-center rounded-full px-1.5 py-0.5 text-xs font-semibold">
          {leads.length}
        </span>
      </CardHeader>
      <CardContent className={cn("flex flex-col gap-2", collapsed && "hidden")}>
        {leads.length === 0 ? (
          <div
            className={cn(
              "text-muted-foreground font-bangla flex min-h-28 items-center justify-center rounded-lg border border-dashed px-4 text-center text-xs transition-colors",
              isDropTarget && "border-primary text-primary bg-background",
            )}
          >
            {draggedLeadId ? pipelineStageLabel[stage] : "কোনো লিড নেই"}
          </div>
        ) : (
          leads.map((lead) => (
            <LeadCard
              key={lead.id}
              lead={lead}
              isDragging={draggedLeadId === lead.id}
              onClick={() => onSelectLead(lead.id)}
              onDragStart={() => onDragStart(lead.id)}
              onDragEnd={onDragEnd}
            />
          ))
        )}
      </CardContent>
    </Card>
  );
}
