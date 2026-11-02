import type { Lead } from "@/features/leads/schemas/lead";

function hoursAgo(hours: number): string {
  return new Date(Date.now() - hours * 60 * 60_000).toISOString();
}

export const mockLeads: Lead[] = [
  {
    id: "l1",
    name: "তানভীর আহমেদ",
    phone: "01711-223344",
    source: "Messenger",
    stage: "new",
    tags: ["ভিআইপি"],
    notes: [],
    lastActivityAt: hoursAgo(1),
  },
  {
    id: "l2",
    name: "মিতু রহমান",
    phone: "01822-556677",
    source: "Facebook Post",
    stage: "new",
    tags: ["দাম জিজ্ঞাসা"],
    notes: [
      {
        id: "n1",
        text: "পণ্যের দাম জানতে চেয়েছেন, রিপ্লাই দেওয়া হয়েছে।",
        createdAt: hoursAgo(2),
      },
    ],
    lastActivityAt: hoursAgo(2),
  },
  {
    id: "l3",
    name: "ফাহিম হোসেন",
    phone: "01933-889900",
    source: "Messenger",
    stage: "contacted",
    tags: ["ফলো-আপ", "কম বাজেট"],
    notes: [{ id: "n1", text: "কল করেছি, আগামী সপ্তাহে কিনবেন বলেছেন।", createdAt: hoursAgo(5) }],
    lastActivityAt: hoursAgo(5),
  },
  {
    id: "l4",
    name: "নুসরাত জাহান",
    phone: "01611-998877",
    source: "Instagram",
    stage: "contacted",
    tags: [],
    notes: [],
    lastActivityAt: hoursAgo(9),
  },
  {
    id: "l5",
    name: "ইমরান খান",
    phone: "01511-443322",
    source: "Messenger",
    stage: "qualified",
    tags: ["ভিআইপি", "ফলো-আপ"],
    notes: [
      { id: "n1", text: "পণ্যের রঙ ও সাইজ নিশ্চিত করেছেন।", createdAt: hoursAgo(10) },
      { id: "n2", text: "কাল বিকেলে অর্ডার কনফার্ম করবেন।", createdAt: hoursAgo(3) },
    ],
    lastActivityAt: hoursAgo(3),
  },
  {
    id: "l6",
    name: "সাদিয়া ইসলাম",
    phone: "01911-667788",
    source: "Messenger",
    stage: "qualified",
    tags: ["দাম জিজ্ঞাসা"],
    notes: [],
    lastActivityAt: hoursAgo(14),
  },
  {
    id: "l7",
    name: "রাকিব হাসান",
    phone: "01722-112233",
    source: "Facebook Post",
    stage: "lost",
    tags: ["কম বাজেট"],
    notes: [{ id: "n1", text: "দাম বেশি মনে করেছেন, আগ্রহী না।", createdAt: hoursAgo(30) }],
    lastActivityAt: hoursAgo(30),
  },
];
