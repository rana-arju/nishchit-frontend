"use client";

import { Truck } from "lucide-react";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { COURIERS, type CourierId } from "@/features/couriers/courier-data";
import {
  CourierConnectSheet,
  type CourierCredentials,
} from "@/features/couriers/components/courier-connect-sheet";
import { CourierCard } from "@/features/couriers/components/courier-card";

export function CouriersView() {
  const [apiKeys, setApiKeys] = useState<Partial<Record<CourierId, string>>>({});
  const [activeCourierId, setActiveCourierId] = useState<CourierId | null>(null);
  const [disconnectId, setDisconnectId] = useState<CourierId | null>(null);

  const activeCourier = COURIERS.find((courier) => courier.id === activeCourierId) ?? null;
  const connectedCount = Object.keys(apiKeys).length;

  function connectCourier(id: CourierId, credentials: CourierCredentials) {
    setApiKeys((current) => ({ ...current, [id]: credentials.apiKey }));
    setActiveCourierId(null);
  }

  function disconnectCourier(id: CourierId) {
    setApiKeys((current) => {
      const next = { ...current };
      delete next[id];
      return next;
    });
  }

  return (
    <div className="flex flex-col gap-4">
      <Card size="sm" className="w-fit border-transparent shadow-sm ring-1">
        <CardContent className="flex items-center gap-3">
          <div className="bg-accent text-accent-foreground grid size-10 place-items-center rounded-xl">
            <Truck className="size-4.5" />
          </div>
          <div>
            <p className="text-xl font-semibold tabular-nums">
              {connectedCount.toLocaleString("bn-BD")}/{COURIERS.length.toLocaleString("bn-BD")}
            </p>
            <p className="font-bangla text-muted-foreground text-xs">কুরিয়ার সংযুক্ত</p>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {COURIERS.map((courier) => (
          <CourierCard
            key={courier.id}
            courier={courier}
            apiKey={apiKeys[courier.id] ?? null}
            onConnect={() => setActiveCourierId(courier.id)}
            onDisconnect={() => setDisconnectId(courier.id)}
          />
        ))}
      </div>

      <CourierConnectSheet
        courier={activeCourier}
        open={activeCourierId !== null}
        onOpenChange={(open) => {
          if (!open) setActiveCourierId(null);
        }}
        onSubmit={(credentials) => {
          if (activeCourierId) connectCourier(activeCourierId, credentials);
        }}
      />

      <ConfirmDialog
        open={disconnectId !== null}
        onOpenChange={(open) => {
          if (!open) setDisconnectId(null);
        }}
        title="কুরিয়ার সংযোগ বিচ্ছিন্ন করুন"
        description="আপনি কি নিশ্চিতভাবে এই কুরিয়ারের সংযোগ বিচ্ছিন্ন করতে চান? নতুন অর্ডার বুক করতে আবার সংযুক্ত করতে হবে।"
        confirmLabel="বিচ্ছিন্ন করুন"
        onConfirm={() => {
          if (disconnectId) disconnectCourier(disconnectId);
          setDisconnectId(null);
        }}
      />
    </div>
  );
}
