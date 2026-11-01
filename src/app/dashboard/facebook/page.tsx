import { FacebookConnectCard } from "@/features/dashboard/components/facebook-connect-card";

export default function FacebookConnectPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Facebook Connect</h1>
        <p className="text-muted-foreground text-sm">
          Link your Facebook Page so Nishchit can read and reply to messages.
        </p>
      </div>
      <FacebookConnectCard />
    </div>
  );
}
