"use client";

import { Sparkles } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

const DEFAULT_PROMPT = `You are Nishchit's AI sales assistant for this shop.
Answer customer questions in a friendly, concise tone (Bangla, Banglish or English — match the customer).
Use the product catalog for price, size and stock details. If an item isn't in the catalog, say you'll check and get back to them.
Always confirm size, color, quantity and delivery address before an order is marked as confirmed.`;

export function ChatbotSettings() {
  const [prompt, setPrompt] = useState(DEFAULT_PROMPT);
  const [useCatalog, setUseCatalog] = useState(true);
  const [autoReply, setAutoReply] = useState(true);
  const [saved, setSaved] = useState(false);

  function handleSave(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaved(true);
  }

  return (
    <form onSubmit={handleSave} className="flex max-w-2xl flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <Sparkles className="text-primary size-4" aria-hidden="true" />
            Bot instructions
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <Textarea
            value={prompt}
            onChange={(event) => {
              setPrompt(event.target.value);
              setSaved(false);
            }}
            className="min-h-40 font-mono text-xs"
          />
          <p className="text-muted-foreground text-xs leading-5">
            This is the system prompt the AI uses when replying to customers on your connected
            channels.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Behavior</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col divide-y">
          <div className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0">
            <div>
              <p className="text-sm font-medium">Answer using product catalog</p>
              <p className="text-muted-foreground text-xs leading-5">
                Reference your Products list to answer price, size and stock questions.
              </p>
            </div>
            <Switch
              checked={useCatalog}
              onCheckedChange={(checked) => {
                setUseCatalog(checked);
                setSaved(false);
              }}
            />
          </div>
          <div className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0">
            <div>
              <p className="text-sm font-medium">Auto-reply on Messenger</p>
              <p className="text-muted-foreground text-xs leading-5">
                Let the bot reply automatically before a teammate steps in.
              </p>
            </div>
            <Switch
              checked={autoReply}
              onCheckedChange={(checked) => {
                setAutoReply(checked);
                setSaved(false);
              }}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center gap-3">
        <Button type="submit" className="w-fit">
          Save changes
        </Button>
        {saved && (
          <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400">Saved.</p>
        )}
      </div>
    </form>
  );
}
