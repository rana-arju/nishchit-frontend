import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FacebookIcon } from "@/features/auth/components/facebook-icon";

const PERMISSIONS = [
  "Manage your Page and its messages",
  "Send and receive Messenger conversations",
  "Read Page posts and comments for new leads",
];

export function FacebookConnectCard() {
  return (
    <Card className="max-w-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <FacebookIcon className="size-5" />
          Facebook Page
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-4 rounded-xl border px-4 py-3">
          <div>
            <p className="text-sm font-medium">Connection status</p>
            <p className="text-muted-foreground text-xs">Not connected</p>
          </div>
          <Button size="sm" disabled>
            Connect with Facebook
          </Button>
        </div>

        <div>
          <p className="text-sm font-medium">What Nishchit will be able to do</p>
          <ul className="mt-2 flex flex-col gap-2">
            {PERMISSIONS.map((permission) => (
              <li key={permission} className="flex items-start gap-2 text-sm">
                <Check className="mt-0.5 size-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                <span className="text-muted-foreground">{permission}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
