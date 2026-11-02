"use client";

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
import type { CourierDefinition } from "@/features/couriers/courier-data";

export type CourierCredentials = { apiKey: string; secretKey: string };

function CourierConnectBody({
  courier,
  onSubmit,
  onCancel,
}: {
  courier: CourierDefinition;
  onSubmit: (credentials: CourierCredentials) => void;
  onCancel: () => void;
}) {
  const [apiKey, setApiKey] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const isValid = apiKey.trim().length > 0 && secretKey.trim().length > 0;

  return (
    <>
      <SheetHeader className="border-b">
        <SheetTitle>{courier.name}</SheetTitle>
        <SheetDescription className="font-bangla">
          অর্ডার বুক ও ট্র্যাক করতে আপনার মার্চেন্ট API তথ্য দিন।
        </SheetDescription>
      </SheetHeader>

      <div className="flex flex-1 flex-col gap-5 p-4">
        <section className="flex flex-col gap-2">
          <p className="text-muted-foreground font-bangla text-xs font-medium">API Key</p>
          <Input
            value={apiKey}
            onChange={(event) => setApiKey(event.target.value)}
            placeholder="যেমন: sf_live_xxxxxxxx"
          />
        </section>

        <section className="flex flex-col gap-2">
          <p className="text-muted-foreground font-bangla text-xs font-medium">Secret Key</p>
          <Input
            type="password"
            value={secretKey}
            onChange={(event) => setSecretKey(event.target.value)}
            placeholder="••••••••••••"
          />
        </section>

        <p className="text-muted-foreground font-bangla text-xs leading-relaxed">
          আপনার {courier.name} মার্চেন্ট প্যানেল থেকে এই তথ্য সংগ্রহ করুন। এই তথ্য শুধুমাত্র অর্ডার
          বুকিং ও ট্র্যাকিংয়ের জন্য ব্যবহৃত হবে।
        </p>
      </div>

      <SheetFooter className="flex-row border-t">
        <Button variant="outline" className="font-bangla flex-1" onClick={onCancel}>
          বাতিল
        </Button>
        <Button
          className="font-bangla flex-1"
          disabled={!isValid}
          onClick={() => onSubmit({ apiKey: apiKey.trim(), secretKey: secretKey.trim() })}
        >
          সংযুক্ত করুন
        </Button>
      </SheetFooter>
    </>
  );
}

export function CourierConnectSheet({
  courier,
  open,
  onOpenChange,
  onSubmit,
}: {
  courier: CourierDefinition | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (credentials: CourierCredentials) => void;
}) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="gap-0">
        {courier && (
          <CourierConnectBody
            key={courier.id}
            courier={courier}
            onSubmit={onSubmit}
            onCancel={() => onOpenChange(false)}
          />
        )}
      </SheetContent>
    </Sheet>
  );
}
