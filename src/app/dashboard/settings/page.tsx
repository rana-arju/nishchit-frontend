import { SettingsForm } from "@/features/dashboard/components/settings-form";

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
        <p className="text-muted-foreground text-sm">Manage your shop profile and account.</p>
      </div>
      <SettingsForm />
    </div>
  );
}
