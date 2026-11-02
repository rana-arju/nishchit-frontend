"use client";

import { Check, CheckCircle2, Loader2, MessageCircle, Users } from "lucide-react";
import { useState } from "react";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FacebookIcon } from "@/features/auth/components/facebook-icon";

const PERMISSIONS = [
  "Manage your Page and its messages",
  "Send and receive Messenger conversations",
  "Read Page posts and comments for new leads",
];

const MOCK_PAGE = {
  name: "Fashion House BD",
  followers: "১২.৫K",
  connectedAt: "আজ",
};

type ConnectionState = "idle" | "connecting" | "connected";

export function FacebookConnectCard() {
  const [state, setState] = useState<ConnectionState>("idle");
  const [disconnectOpen, setDisconnectOpen] = useState(false);

  function handleConnect() {
    setState("connecting");
    setTimeout(() => setState("connected"), 1200);
  }

  return (
    <Card className="max-w-xl border-transparent shadow-sm ring-1">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <FacebookIcon className="size-5" />
          Facebook Page
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {state === "connected" ? (
          <div className="flex items-center justify-between gap-4 rounded-xl border px-4 py-3">
            <div className="flex min-w-0 items-center gap-3">
              <span className="bg-accent text-accent-foreground grid size-11 shrink-0 place-items-center rounded-xl">
                <FacebookIcon className="size-5" />
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">{MOCK_PAGE.name}</p>
                <p className="text-muted-foreground font-bangla inline-flex items-center gap-1 text-xs">
                  <Users className="size-3" />
                  {MOCK_PAGE.followers} ফলোয়ার
                </p>
              </div>
            </div>
            <Button
              size="sm"
              variant="outline"
              className="font-bangla shrink-0"
              onClick={() => setDisconnectOpen(true)}
            >
              সংযোগ বিচ্ছিন্ন করুন
            </Button>
          </div>
        ) : (
          <div className="flex items-center justify-between gap-4 rounded-xl border px-4 py-3">
            <div>
              <p className="text-sm font-medium">Connection status</p>
              <p className="text-muted-foreground text-xs">Not connected</p>
            </div>
            <Button size="sm" disabled={state === "connecting"} onClick={handleConnect}>
              {state === "connecting" && <Loader2 className="size-4 animate-spin" />}
              {state === "connecting" ? "Connecting..." : "Connect with Facebook"}
            </Button>
          </div>
        )}

        {state === "connected" && (
          <div className="bg-chart-4/10 text-chart-4 flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium">
            <CheckCircle2 className="size-3.5 shrink-0" />
            <span className="font-bangla">
              {MOCK_PAGE.connectedAt} সংযুক্ত হয়েছে — মেসেঞ্জার মেসেজ এখন ইউনিফাইড ইনবক্সে আসবে।
            </span>
          </div>
        )}

        <div>
          <p className="text-sm font-medium">What Nishchit will be able to do</p>
          <ul className="mt-2 flex flex-col gap-2">
            {PERMISSIONS.map((permission) => (
              <li key={permission} className="flex items-start gap-2 text-sm">
                <Check className="text-chart-4 mt-0.5 size-4 shrink-0" />
                <span className="text-muted-foreground">{permission}</span>
              </li>
            ))}
          </ul>
        </div>

        {state === "connected" && (
          <div className="text-muted-foreground flex items-center gap-1.5 text-xs">
            <MessageCircle className="size-3.5" />
            <span className="font-bangla">নতুন মেসেজ ইউনিফাইড ইনবক্সে দেখুন।</span>
          </div>
        )}
      </CardContent>

      <ConfirmDialog
        open={disconnectOpen}
        onOpenChange={setDisconnectOpen}
        title="পেজ সংযোগ বিচ্ছিন্ন করুন"
        description="সংযোগ বিচ্ছিন্ন করলে নতুন মেসেজ ও কমেন্ট আর ইউনিফাইড ইনবক্সে আসবে না।"
        confirmLabel="বিচ্ছিন্ন করুন"
        onConfirm={() => {
          setState("idle");
          setDisconnectOpen(false);
        }}
      />
    </Card>
  );
}
