import { InboxView } from "@/features/inbox/components/inbox-view";

export default function InboxPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Unified Inbox</h1>
        <p className="text-muted-foreground text-sm">
          All customer conversations across channels, in one place.
        </p>
      </div>
      <InboxView />
    </div>
  );
}
