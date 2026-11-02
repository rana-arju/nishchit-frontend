"use client";

import { CheckIcon, ChevronDown, Plus, Tag } from "lucide-react";
import { useState } from "react";
import { TagPill } from "@/components/shared/tag-pill";
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
import {
  conversationStatusLabel,
  conversationStatusDotClassName,
} from "@/features/inbox/components/conversation-thread";
import type { Conversation, ConversationStatus } from "@/features/inbox/schemas/conversation";
import { PIPELINE_STAGES, pipelineStageLabel, type PipelineStage } from "@/types/pipeline-stage";
import { cn } from "cn";

const CONVERSATION_STATUSES: ConversationStatus[] = ["open", "pending", "resolved"];

function formatNoteTime(timestamp: string): string {
  return new Date(timestamp).toLocaleString("bn-BD", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

type ConversationDetailBodyProps = {
  conversation: Conversation;
  onChangeStatus: (status: ConversationStatus) => void;
  onChangeStage: (stage: PipelineStage) => void;
  onAddTag: (tag: string) => void;
  onRemoveTag: (tag: string) => void;
  onAddNote: (text: string) => void;
};

function ConversationDetailBody({
  conversation,
  onChangeStatus,
  onChangeStage,
  onAddTag,
  onRemoveTag,
  onAddNote,
}: ConversationDetailBodyProps) {
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
        <SheetTitle className="font-bangla">{conversation.customerName}</SheetTitle>
        <SheetDescription className="font-bangla">কথোপকথনের বিস্তারিত তথ্য</SheetDescription>
      </SheetHeader>

      <div className="scrollbar-hidden flex flex-1 flex-col gap-5 overflow-y-auto p-4">
        <section className="flex flex-col gap-2">
          <p className="text-muted-foreground font-bangla text-xs font-medium">স্ট্যাটাস</p>
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button variant="outline" size="sm" className="font-bangla w-fit">
                  <span
                    className={cn(
                      "size-1.5 rounded-full",
                      conversationStatusDotClassName[conversation.status],
                    )}
                  />
                  {conversationStatusLabel[conversation.status]}
                  <ChevronDown />
                </Button>
              }
            />
            <DropdownMenuContent>
              {CONVERSATION_STATUSES.map((status) => (
                <DropdownMenuItem
                  key={status}
                  className="font-bangla"
                  onClick={() => onChangeStatus(status)}
                >
                  {conversationStatusLabel[status]}
                  {conversation.status === status && <CheckIcon className="ml-auto size-3.5" />}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </section>

        <section className="flex flex-col gap-2">
          <p className="text-muted-foreground font-bangla text-xs font-medium">লিড স্টেজ</p>
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button variant="outline" size="sm" className="font-bangla w-fit">
                  {pipelineStageLabel[conversation.stage]}
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
                  {conversation.stage === stage && <CheckIcon className="ml-auto size-3.5" />}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </section>

        <section className="flex flex-col gap-2">
          <p className="text-muted-foreground font-bangla text-xs font-medium">ট্যাগ</p>
          <div className="flex flex-wrap gap-1.5">
            {conversation.tags.length === 0 && (
              <span className="text-muted-foreground font-bangla text-xs">কোনো ট্যাগ নেই।</span>
            )}
            {conversation.tags.map((tag) => (
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
            {conversation.notes.length === 0 && (
              <span className="text-muted-foreground font-bangla text-xs">কোনো নোট নেই।</span>
            )}
            {conversation.notes.map((note) => (
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

export function ConversationDetailSheet({
  conversation,
  open,
  onOpenChange,
  onChangeStatus,
  onChangeStage,
  onAddTag,
  onRemoveTag,
  onAddNote,
}: {
  conversation: Conversation;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onChangeStatus: (status: ConversationStatus) => void;
  onChangeStage: (stage: PipelineStage) => void;
  onAddTag: (tag: string) => void;
  onRemoveTag: (tag: string) => void;
  onAddNote: (text: string) => void;
}) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="gap-0 overflow-y-auto">
        <ConversationDetailBody
          key={conversation.id}
          conversation={conversation}
          onChangeStatus={onChangeStatus}
          onChangeStage={onChangeStage}
          onAddTag={onAddTag}
          onRemoveTag={onRemoveTag}
          onAddNote={onAddNote}
        />
      </SheetContent>
    </Sheet>
  );
}
