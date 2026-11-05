"use client";

import { Plus } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  addLeadNote,
  createLead,
  fetchLeads,
  updateLeadStage,
  updateLeadTags,
} from "@/features/leads/api/leads";
import { LeadColumn } from "@/features/leads/components/lead-column";
import { LeadCreateSheet } from "@/features/leads/components/lead-create-sheet";
import { LeadDetailSheet } from "@/features/leads/components/lead-detail-sheet";
import type { Lead } from "@/features/leads/schemas/lead";
import { ApiError } from "@/lib/api-client";
import { PIPELINE_STAGES, type PipelineStage } from "@/types/pipeline-stage";

type State = { phase: "loading" } | { phase: "error" } | { phase: "ready"; data: Lead[] };

export function LeadsBoard() {
  const [state, setState] = useState<State>({ phase: "loading" });
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [draggedLeadId, setDraggedLeadId] = useState<string | null>(null);
  const [dropTargetStage, setDropTargetStage] = useState<PipelineStage | null>(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

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

  function putLead(updated: Lead) {
    setState((current) =>
      current.phase === "ready"
        ? {
            ...current,
            data: current.data.map((lead) => (lead.id === updated.id ? updated : lead)),
          }
        : current,
    );
  }

  async function moveLeadToStage(id: string, stage: PipelineStage) {
    setActionError(null);
    try {
      putLead(await updateLeadStage(id, stage));
    } catch (error) {
      setActionError(error instanceof ApiError ? error.message : "স্ট্যাটাস পরিবর্তন করা যায়নি।");
    }
  }

  async function handleAddTag(tag: string) {
    if (!selectedLead || selectedLead.tags.includes(tag)) return;
    setActionError(null);
    try {
      putLead(await updateLeadTags(selectedLead.id, [...selectedLead.tags, tag]));
    } catch (error) {
      setActionError(error instanceof ApiError ? error.message : "ট্যাগ যোগ করা যায়নি।");
    }
  }

  async function handleRemoveTag(tag: string) {
    if (!selectedLead) return;
    setActionError(null);
    try {
      putLead(
        await updateLeadTags(
          selectedLead.id,
          selectedLead.tags.filter((existing) => existing !== tag),
        ),
      );
    } catch (error) {
      setActionError(error instanceof ApiError ? error.message : "ট্যাগ মুছে ফেলা যায়নি।");
    }
  }

  async function handleAddNote(text: string) {
    if (!selectedLead) return;
    setActionError(null);
    try {
      putLead(await addLeadNote(selectedLead.id, text));
    } catch (error) {
      setActionError(error instanceof ApiError ? error.message : "নোট যোগ করা যায়নি।");
    }
  }

  async function handleCreate(input: { name: string; phone: string; source: string }) {
    const created = await createLead(input);
    setState((current) =>
      current.phase === "ready" ? { ...current, data: [created, ...current.data] } : current,
    );
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
      <div className="flex items-center justify-between gap-3">
        {actionError ? (
          <p className="text-destructive font-bangla text-xs">{actionError}</p>
        ) : (
          <span />
        )}
        <Button size="sm" className="font-bangla shrink-0" onClick={() => setCreateOpen(true)}>
          <Plus className="size-4" />
          নতুন লিড
        </Button>
      </div>

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
        onAddTag={handleAddTag}
        onRemoveTag={handleRemoveTag}
        onAddNote={handleAddNote}
      />

      <LeadCreateSheet open={createOpen} onOpenChange={setCreateOpen} onCreate={handleCreate} />
    </>
  );
}
