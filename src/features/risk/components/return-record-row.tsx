import type { ReturnReasonCategory, ReturnRecord } from "@/features/risk/schemas/risk";

const reasonLabel: Record<ReturnReasonCategory, string> = {
  size_issue: "সাইজ সমস্যা",
  changed_mind: "মত পরিবর্তন",
  damaged: "ক্ষতিগ্রস্ত পণ্য",
  not_as_described: "বিবরণের সাথে মিল নেই",
  other: "অন্যান্য",
};

function formatRelativeTime(timestamp: string): string {
  const diffHours = Math.round((Date.now() - new Date(timestamp).getTime()) / 3_600_000);
  if (diffHours < 24) return `${diffHours} ঘণ্টা আগে`;
  return `${Math.round(diffHours / 24)} দিন আগে`;
}

export function ReturnRecordRow({ record }: { record: ReturnRecord }) {
  return (
    <div className="flex flex-col gap-2 px-4 py-3 md:grid md:grid-cols-[1.3fr_1.3fr_1fr_0.8fr_0.8fr] md:items-center md:gap-4">
      <div className="min-w-0">
        <p className="font-bangla truncate text-sm font-semibold">{record.customerName}</p>
        <p className="text-muted-foreground truncate text-xs">{record.orderNumber}</p>
      </div>
      <p className="font-bangla text-muted-foreground truncate text-xs md:text-sm">
        {record.productName}
      </p>
      <div>
        <span className="font-bangla bg-muted text-muted-foreground inline-block rounded-full px-2 py-0.5 text-[11px] font-medium">
          {reasonLabel[record.reasonCategory]}
        </span>
        <p className="font-bangla text-muted-foreground mt-1 text-xs md:hidden">
          {record.reasonNote}
        </p>
      </div>
      <p className="text-sm font-semibold tabular-nums">৳{record.amount.toLocaleString("bn-BD")}</p>
      <p className="text-muted-foreground text-xs whitespace-nowrap">
        {formatRelativeTime(record.returnedAt)}
      </p>
    </div>
  );
}
