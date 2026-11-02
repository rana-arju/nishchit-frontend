"use client";

import {
  AlertTriangle,
  CheckIcon,
  ChevronDown,
  MapPin,
  Pencil,
  Phone,
  Plus,
  Tag,
  Trash2,
  Truck,
} from "lucide-react";
import { useState } from "react";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
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
import { ChannelIcon } from "@/features/inbox/components/channel-icon";
import {
  ORDER_STATUSES,
  OrderStatusBadge,
  orderStatusLabel,
} from "@/features/orders/components/order-status-badge";
import type { Order, OrderStatus } from "@/features/orders/schemas/order";

function formatDateTime(timestamp: string): string {
  return new Date(timestamp).toLocaleString("bn-BD", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

type OrderDetailBodyProps = {
  order: Order;
  onChangeStatus: (status: OrderStatus) => void;
  onAddTag: (tag: string) => void;
  onRemoveTag: (tag: string) => void;
  onAddNote: (text: string) => void;
  onEdit: () => void;
  onDelete: () => void;
};

function OrderDetailBody({
  order,
  onChangeStatus,
  onAddTag,
  onRemoveTag,
  onAddNote,
  onEdit,
  onDelete,
}: OrderDetailBodyProps) {
  const [tagInput, setTagInput] = useState("");
  const [noteInput, setNoteInput] = useState("");
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const total = order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

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
      <SheetHeader className="flex-row items-start justify-between gap-2 border-b">
        <div>
          <SheetTitle className="flex items-center gap-2">
            {order.orderNumber}
            <ChannelIcon channel={order.channel} branded className="size-4" />
            {order.isHighRisk && <AlertTriangle className="text-destructive size-4" />}
          </SheetTitle>
          <SheetDescription className="font-bangla">{order.customerName}</SheetDescription>
        </div>
        <div className="mr-8 flex shrink-0 gap-1">
          <Button size="icon-sm" variant="outline" aria-label="অর্ডার এডিট করুন" onClick={onEdit}>
            <Pencil className="size-3.5" />
          </Button>
          <Button
            size="icon-sm"
            variant="outline"
            aria-label="অর্ডার মুছুন"
            onClick={() => setDeleteConfirmOpen(true)}
          >
            <Trash2 className="text-destructive size-3.5" />
          </Button>
        </div>
      </SheetHeader>

      <div className="scrollbar-hidden flex flex-1 flex-col gap-5 overflow-y-auto p-4">
        <section className="flex flex-col gap-2">
          <p className="text-muted-foreground font-bangla text-xs font-medium">স্ট্যাটাস</p>
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button variant="outline" size="sm" className="w-fit">
                  <OrderStatusBadge status={order.status} />
                  <ChevronDown />
                </Button>
              }
            />
            <DropdownMenuContent>
              {ORDER_STATUSES.map((status) => (
                <DropdownMenuItem
                  key={status}
                  className="font-bangla"
                  onClick={() => onChangeStatus(status)}
                >
                  {orderStatusLabel[status]}
                  {order.status === status && <CheckIcon className="ml-auto size-3.5" />}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </section>

        <section className="flex flex-col gap-1.5 text-sm">
          <p className="text-muted-foreground font-bangla text-xs font-medium">কাস্টমার তথ্য</p>
          <span className="font-bangla inline-flex items-center gap-1.5">
            <Phone className="text-muted-foreground size-3.5" />
            {order.customerPhone}
          </span>
          <span className="font-bangla inline-flex items-start gap-1.5">
            <MapPin className="text-muted-foreground mt-0.5 size-3.5 shrink-0" />
            {order.address}
          </span>
          {order.courier && (
            <span className="font-bangla inline-flex items-center gap-1.5">
              <Truck className="text-muted-foreground size-3.5" />
              {order.courier}
            </span>
          )}
        </section>

        <section className="flex flex-col gap-2">
          <p className="text-muted-foreground font-bangla text-xs font-medium">পণ্যসমূহ</p>
          <div className="divide-border flex flex-col divide-y rounded-lg border">
            {order.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-2 px-3 py-2 text-sm"
              >
                <div className="min-w-0">
                  <p className="font-bangla truncate">{item.productName}</p>
                  <p className="text-muted-foreground text-xs">
                    {item.quantity} x ৳{item.price.toLocaleString("bn-BD")}
                  </p>
                </div>
                <p className="shrink-0 font-medium tabular-nums">
                  ৳{(item.quantity * item.price).toLocaleString("bn-BD")}
                </p>
              </div>
            ))}
            <div className="flex items-center justify-between px-3 py-2 text-sm font-semibold">
              <span className="font-bangla">মোট</span>
              <span className="tabular-nums">৳{total.toLocaleString("bn-BD")}</span>
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-2">
          <p className="text-muted-foreground font-bangla text-xs font-medium">ট্যাগ</p>
          <div className="flex flex-wrap gap-1.5">
            {order.tags.length === 0 && (
              <span className="text-muted-foreground font-bangla text-xs">কোনো ট্যাগ নেই।</span>
            )}
            {order.tags.map((tag) => (
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
            {order.notes.length === 0 && (
              <span className="text-muted-foreground font-bangla text-xs">কোনো নোট নেই।</span>
            )}
            {order.notes.map((note) => (
              <div key={note.id} className="bg-muted rounded-lg px-3 py-2">
                <p className="font-bangla text-sm leading-relaxed">{note.text}</p>
                <p className="text-muted-foreground mt-1 text-[11px]">
                  {formatDateTime(note.createdAt)}
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

      <ConfirmDialog
        open={deleteConfirmOpen}
        onOpenChange={setDeleteConfirmOpen}
        title="অর্ডার মুছে ফেলুন"
        description="আপনি কি নিশ্চিতভাবে এই অর্ডারটি মুছে ফেলতে চান?"
        confirmLabel="মুছে ফেলুন"
        onConfirm={onDelete}
      />
    </>
  );
}

export function OrderDetailSheet({
  order,
  open,
  onOpenChange,
  onChangeStatus,
  onAddTag,
  onRemoveTag,
  onAddNote,
  onEdit,
  onDelete,
}: {
  order: Order | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onChangeStatus: (status: OrderStatus) => void;
  onAddTag: (tag: string) => void;
  onRemoveTag: (tag: string) => void;
  onAddNote: (text: string) => void;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="gap-0 overflow-y-auto">
        {order && (
          <OrderDetailBody
            key={order.id}
            order={order}
            onChangeStatus={onChangeStatus}
            onAddTag={onAddTag}
            onRemoveTag={onRemoveTag}
            onAddNote={onAddNote}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        )}
      </SheetContent>
    </Sheet>
  );
}
