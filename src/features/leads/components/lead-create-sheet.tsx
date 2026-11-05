"use client";

import { Loader2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ApiError } from "@/lib/api-client";

export function LeadCreateSheet({
  open,
  onOpenChange,
  onCreate,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreate: (input: { name: string; phone: string; source: string }) => Promise<void>;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [source, setSource] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  function reset() {
    setName("");
    setPhone("");
    setSource("");
    setError(null);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedName = name.trim();
    const trimmedPhone = phone.trim();
    if (!trimmedName || !trimmedPhone) {
      setError("নাম এবং ফোন নম্বর আবশ্যক।");
      return;
    }

    setError(null);
    setSaving(true);
    try {
      await onCreate({ name: trimmedName, phone: trimmedPhone, source: source.trim() || "Manual" });
      reset();
      onOpenChange(false);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "লিড তৈরি করা যায়নি।");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Sheet
      open={open}
      onOpenChange={(next) => {
        if (!next) reset();
        onOpenChange(next);
      }}
    >
      <SheetContent className="gap-0 overflow-y-auto">
        <form onSubmit={handleSubmit} className="flex h-full flex-col">
          <SheetHeader className="border-b">
            <SheetTitle className="font-bangla">নতুন লিড যোগ করুন</SheetTitle>
            <SheetDescription className="font-bangla">
              গ্রাহকের নাম ও ফোন নম্বর দিয়ে একটি নতুন লিড তৈরি করুন।
            </SheetDescription>
          </SheetHeader>

          <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="flex flex-col gap-1.5">
              <p className="text-muted-foreground font-bangla text-xs font-medium">নাম</p>
              <Input
                value={name}
                onChange={(event) => setName(event.target.value)}
                disabled={saving}
                autoFocus
                className="font-bangla"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <p className="text-muted-foreground font-bangla text-xs font-medium">ফোন নম্বর</p>
              <Input
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                disabled={saving}
                className="font-bangla"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <p className="text-muted-foreground font-bangla text-xs font-medium">
                সোর্স (ঐচ্ছিক)
              </p>
              <Input
                value={source}
                onChange={(event) => setSource(event.target.value)}
                placeholder="Manual"
                disabled={saving}
                className="font-bangla"
              />
            </div>
            {error && <p className="text-destructive font-bangla text-xs">{error}</p>}
          </div>

          <SheetFooter className="border-t">
            <Button type="submit" disabled={saving} className="font-bangla">
              {saving ? <Loader2 className="size-4 animate-spin" /> : null}
              তৈরি করুন
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
