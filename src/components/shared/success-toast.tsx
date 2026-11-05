import { CheckCircle2 } from "lucide-react";

export function SuccessToast({ message, show }: { message: string; show: boolean }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed top-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2.5 rounded-full border border-emerald-200 bg-white px-5 py-3 text-sm font-semibold text-emerald-700 shadow-lg transition-all duration-300 ease-out dark:border-emerald-900 dark:bg-slate-900 dark:text-emerald-300 ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-4 opacity-0"
      }`}
    >
      <CheckCircle2 className="size-5 text-emerald-500" />
      {message}
    </div>
  );
}
