"use client";

import { useEffect, useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchLeads } from "@/features/leads/api/leads";
import { LeadColumn } from "@/features/leads/components/lead-column";
import { LeadDetailSheet } from "@/features/leads/components/lead-detail-sheet";
import type { Lead } from "@/features/leads/schemas/lead";
import { PIPELINE_STAGES, pipelineStageLabel, type PipelineStage } from "@/types/pipeline-stage";

type State = { phase: "loading" } | { phase: "error" } | { phase: "ready"; data: Lead[] };

export function LeadsBoard() {
  const [state, setState] = useState<State>({ phase: "loading" });
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [draggedLeadId, setDraggedLeadId] = useState<string | null>(null);
  const [dropTargetStage, setDropTargetStage] = useState<PipelineStage | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetchLeads()
      .then((data) => {
        if (!cancelled) setState({ phase: "ready", data });
      })
      .catch(() => {
        if (!cancelled) setState({ phase: "error" });
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const leads = state.phase === "ready" ? state.data : [];
  const selectedLead = leads.find((lead) => lead.id === selectedId) ?? null;

  const leadsByStage = useMemo(() => {
    const grouped = Object.fromEntries(
      PIPELINE_STAGES.map((stage) => [stage, [] as Lead[]]),
    ) as Record<PipelineStage, Lead[]>;
    for (const lead of state.phase === "ready" ? state.data : []) grouped[lead.stage].push(lead);
    return grouped;
  }, [state]);

  function updateLead(id: string, updater: (lead: Lead) => Lead) {
    setState((current) =>
      current.phase === "ready"
        ? { ...current, data: current.data.map((lead) => (lead.id === id ? updater(lead) : lead)) }
        : current,
    );
  }

  function moveLeadToStage(id: string, stage: PipelineStage) {
    const stageTags = new Set(Object.values(pipelineStageLabel));
    updateLead(id, (lead) => ({
      ...lead,
      stage,
      tags: [...lead.tags.filter((tag) => !stageTags.has(tag)), pipelineStageLabel[stage]],
    }));
  }

  function finishDragging() {
    setDraggedLeadId(null);
    setDropTargetStage(null);
  }

  if (state.phase === "loading") {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {PIPELINE_STAGES.map((stage) => (
          <Skeleton key={stage} className="h-64 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  if (state.phase === "error") {
    return (
      <Card>
        <CardContent className="text-destructive font-bangla py-6 text-center text-sm">
          লিড লোড করা যায়নি। পরে আবার চেষ্টা করুন।
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <div className="scrollbar-hidden flex max-w-full min-w-0 items-start gap-4 overflow-x-auto pb-3">
        {PIPELINE_STAGES.map((stage) => (
          <LeadColumn
            key={stage}
            stage={stage}
            leads={leadsByStage[stage]}
            draggedLeadId={draggedLeadId}
            isDropTarget={dropTargetStage === stage}
            onSelectLead={setSelectedId}
            onDragStart={setDraggedLeadId}
            onDragEnd={finishDragging}
            onDragEnter={() => {
              if (draggedLeadId) setDropTargetStage(stage);
            }}
            onDragLeave={() => {
              if (dropTargetStage === stage) setDropTargetStage(null);
            }}
            onDrop={(leadId) => {
              if (leadId) moveLeadToStage(leadId, stage);
              finishDragging();
            }}
          />
        ))}
      </div>

      <LeadDetailSheet
        lead={selectedLead}
        open={selectedLead !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedId(null);
        }}
        onChangeStage={(stage) => {
          if (selectedLead) moveLeadToStage(selectedLead.id, stage);
        }}
        onAddTag={(tag) => {
          if (selectedLead && !selectedLead.tags.includes(tag)) {
            updateLead(selectedLead.id, (lead) => ({ ...lead, tags: [...lead.tags, tag] }));
          }
        }}
        onRemoveTag={(tag) => {
          if (selectedLead) {
            updateLead(selectedLead.id, (lead) => ({
              ...lead,
              tags: lead.tags.filter((existing) => existing !== tag),
            }));
          }
        }}
        onAddNote={(text) => {
          if (selectedLead) {
            updateLead(selectedLead.id, (lead) => ({
              ...lead,
              notes: [
                ...lead.notes,
                { id: `note-${Date.now()}`, text, createdAt: new Date().toISOString() },
              ],
            }));
          }
        }}
      />
    </>
  );
}
