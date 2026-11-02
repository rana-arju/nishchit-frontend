"use client";

import { CheckIcon, ChevronDown, Phone, Plus, Tag } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { TagPill } from "@/components/shared/tag-pill";
import type { Lead } from "@/features/leads/schemas/lead";
import { PIPELINE_STAGES, pipelineStageLabel, type PipelineStage } from "@/types/pipeline-stage";

function formatNoteTime(timestamp: string): string {
  return new Date(timestamp).toLocaleString("bn-BD", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

type LeadDetailBodyProps = {
  lead: Lead;
  onChangeStage: (stage: PipelineStage) => void;
  onAddTag: (tag: string) => void;
  onRemoveTag: (tag: string) => void;
  onAddNote: (text: string) => void;
};

function LeadDetailBody({
  lead,
  onChangeStage,
  onAddTag,
  onRemoveTag,
  onAddNote,
}: LeadDetailBodyProps) {
  const [tagInput, setTagInput] = useState("");
  const [noteInput, setNoteInput] = useState("");

  function submitTag() {
    const trimmed = tagInput.trim();
    if (!trimmed) return;
    onAddTag(trimmed);
    setTagInput("");
  }

  function submitNote() {
    const trimmed = noteInput.trim();
    if (!trimmed) return;
    onAddNote(trimmed);
    setNoteInput("");
  }

  return (
    <>
      <SheetHeader className="border-b">
        <SheetTitle className="font-bangla">{lead.name}</SheetTitle>
        <SheetDescription className="font-bangla flex items-center gap-1.5">
          <Phone className="size-3.5" />
          {lead.phone} • {lead.source}
        </SheetDescription>
      </SheetHeader>

      <div className="scrollbar-hidden flex flex-1 flex-col gap-5 overflow-y-auto p-4">
        <section className="flex flex-col gap-2">
          <p className="text-muted-foreground font-bangla text-xs font-medium">স্ট্যাটাস</p>
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button variant="outline" size="sm" className="font-bangla w-fit">
                  {pipelineStageLabel[lead.stage]}
                  <ChevronDown />
                </Button>
              }
            />
            <DropdownMenuContent>
              {PIPELINE_STAGES.map((stage) => (
                <DropdownMenuItem
                  key={stage}
                  className="font-bangla"
                  onClick={() => onChangeStage(stage)}
                >
                  {pipelineStageLabel[stage]}
                  {lead.stage === stage && <CheckIcon className="ml-auto size-3.5" />}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </section>

        <section className="flex flex-col gap-2">
          <p className="text-muted-foreground font-bangla text-xs font-medium">ট্যাগ</p>
          <div className="flex flex-wrap gap-1.5">
            {lead.tags.length === 0 && (
              <span className="text-muted-foreground font-bangla text-xs">কোনো ট্যাগ নেই।</span>
            )}
            {lead.tags.map((tag) => (
              <TagPill key={tag} label={tag} onRemove={() => onRemoveTag(tag)} />
            ))}
          </div>
          <div className="flex gap-1.5">
            <div className="relative flex-1">
              <Tag className="text-muted-foreground absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2" />
              <Input
                value={tagInput}
                onChange={(event) => setTagInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    submitTag();
                  }
                }}
                placeholder="নতুন ট্যাগ যোগ করুন"
                className="font-bangla pl-8"
              />
            </div>
            <Button size="icon" variant="outline" aria-label="ট্যাগ যোগ করুন" onClick={submitTag}>
              <Plus className="size-4" />
            </Button>
          </div>
        </section>

        <section className="flex flex-col gap-2">
          <p className="text-muted-foreground font-bangla text-xs font-medium">নোট</p>
          <div className="flex flex-col gap-2">
            {lead.notes.length === 0 && (
              <span className="text-muted-foreground font-bangla text-xs">কোনো নোট নেই।</span>
            )}
            {lead.notes.map((note) => (
              <div key={note.id} className="bg-muted rounded-lg px-3 py-2">
                <p className="font-bangla text-sm leading-relaxed">{note.text}</p>
                <p className="text-muted-foreground mt-1 text-[11px]">
                  {formatNoteTime(note.createdAt)}
                </p>
              </div>
            ))}
          </div>
          <Textarea
            value={noteInput}
            onChange={(event) => setNoteInput(event.target.value)}
            placeholder="একটি নোট লিখুন..."
            className="font-bangla min-h-16"
          />
          <Button
            size="sm"
            variant="secondary"
            className="font-bangla w-fit"
            disabled={!noteInput.trim()}
            onClick={submitNote}
          >
            নোট যোগ করুন
          </Button>
        </section>
      </div>
    </>
  );
}

export function LeadDetailSheet({
  lead,
  open,
  onOpenChange,
  onChangeStage,
  onAddTag,
  onRemoveTag,
  onAddNote,
}: {
  lead: Lead | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onChangeStage: (stage: PipelineStage) => void;
  onAddTag: (tag: string) => void;
  onRemoveTag: (tag: string) => void;
  onAddNote: (text: string) => void;
}) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="gap-0 overflow-y-auto">
        {lead && (
          <LeadDetailBody
            key={lead.id}
            lead={lead}
            onChangeStage={onChangeStage}
            onAddTag={onAddTag}
            onRemoveTag={onRemoveTag}
            onAddNote={onAddNote}
          />
        )}
      </SheetContent>
    </Sheet>
  );
}
