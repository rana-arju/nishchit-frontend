"use client";

import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchLeads } from "@/features/leads/api/leads";
import { LeadCard } from "@/features/leads/components/lead-card";
import { LeadDetailSheet } from "@/features/leads/components/lead-detail-sheet";
import type { Lead } from "@/features/leads/schemas/lead";
import { PIPELINE_STAGES, pipelineStageLabel, type PipelineStage } from "@/types/pipeline-stage";

type State = { phase: "loading" } | { phase: "error" } | { phase: "ready"; data: Lead[] };

export function LeadsBoard() {
  const [state, setState] = useState<State>({ phase: "loading" });
  const [selectedId, setSelectedId] = useState<string | null>(null);

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
    const grouped: Record<PipelineStage, Lead[]> = {
      new: [],
      contacted: [],
      qualified: [],
      lost: [],
    };
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
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {PIPELINE_STAGES.map((stage) => (
          <Card key={stage} size="sm">
            <CardHeader className="flex flex-row items-center justify-between gap-2">
              <CardTitle className="font-bangla text-sm">{pipelineStageLabel[stage]}</CardTitle>
              <span className="bg-muted text-muted-foreground flex size-5 items-center justify-center rounded-full text-xs font-medium">
                {leadsByStage[stage].length}
              </span>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              {leadsByStage[stage].length === 0 ? (
                <div className="text-muted-foreground font-bangla flex min-h-24 items-center justify-center rounded-lg border border-dashed text-xs">
                  কোনো লিড নেই
                </div>
              ) : (
                leadsByStage[stage].map((lead) => (
                  <LeadCard key={lead.id} lead={lead} onClick={() => setSelectedId(lead.id)} />
                ))
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <LeadDetailSheet
        lead={selectedLead}
        open={selectedLead !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedId(null);
        }}
        onChangeStage={(stage) => {
          if (selectedLead) updateLead(selectedLead.id, (lead) => ({ ...lead, stage }));
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
